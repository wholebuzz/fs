import {
  ParquetEnvelopeReader,
  ParquetReader,
  ParquetSchema,
  ParquetShredder,
  ParquetTransformer,
} from 'parquetjs'
import { RowInterface } from 'parquetjs/lib/row.interface'
import { PassThrough, Transform } from 'stream'
import StreamTree, { ReadableStreamTree, WritableStreamTree } from 'tree-stream'
import { FileSystem } from './fs'
import { readableToArray, readableToBuffer } from './stream'
import {
  isShardedFilename,
  lastItem,
  openReadableFiles,
  ReadableFileOptions,
  ReadableFileSpec,
  shardedFilenames,
} from './util'

export const parquetUtil = require('parquetjs/lib/util')
export const parquetThrift = require('parquetjs/gen-nodejs/parquet_types')

export interface OpenParquetFileOptions {
  columnList?: string[][] | string[]
  streamingParquet?: boolean
}

export interface ParquetFileOptions {
  columnList?: string[][] | string[]
  shards?: number
  shardFilter?: (index: number) => boolean
  streamingParquet?: boolean
}

export interface ReadableSpec extends ReadableFileSpec {
  options?: ReadableFileOptions & OpenParquetFileOptions
}

export async function readParquetFile(
  fileSystem: FileSystem,
  url: string,
  options?: OpenParquetFileOptions
) {
  return readableToArray(await openParquetFile(fileSystem, url, options))
}

export async function openReadableFileSet(
  fileSystem: FileSystem,
  fileNames: ReadableFileSpec[] | Record<string, ReadableSpec>
) {
  const ret: Record<string, ReadableStreamTree[]> = {}
  for (const [key, spec] of Object.entries(fileNames)) {
    ret[key] = spec.stream
      ? spec.stream
      : spec.format === 'parquet' && !spec.options?.query
      ? await openParquetFiles(fileSystem, spec.url!, spec.options)
      : await openReadableFiles(fileSystem, spec.url!, spec.options)
  }
  return ret
}

export async function openParquetFiles(
  fileSystem: FileSystem,
  url: string,
  options?: ParquetFileOptions
): Promise<ReadableStreamTree[]> {
  if (!options?.shards || !isShardedFilename(url)) {
    return [await openParquetFile(fileSystem, url, options)]
  }
  return Promise.all(
    shardedFilenames(url, options.shards!, options.shardFilter).map((filename) =>
      openParquetFile(fileSystem, filename, options)
    )
  )
}

export async function openParquetFile(
  fileSystem: FileSystem,
  url: string,
  options?: OpenParquetFileOptions
): Promise<ReadableStreamTree> {
  if (options?.streamingParquet !== false) {
    const reader = await newParquetReader(fileSystem, url)
    const { metadata, schema } = reader
    const columnList = (options?.columnList ?? []).map((x: any) => (Array.isArray(x) ? x : [x]))

    let currentRowGroup = 0
    let buffersCurrentOffset = 0
    let buffersCurrentLengthSum = 0
    const buffers: Buffer[] = []
    const isRowGroupReady = () => {
      if (currentRowGroup >= metadata.row_groups.length) return false
      const lastColChunk = lastItem(metadata.row_groups[currentRowGroup].columns)
      const lastColChunkOffset = lastColChunk.meta_data.data_page_offset?.valueOf()
      const lastColChunkLength = lastColChunk.meta_data.total_compressed_size?.valueOf()
      return (
        lastColChunkOffset &&
        lastColChunkLength &&
        buffersCurrentOffset + buffersCurrentLengthSum >= lastColChunkOffset + lastColChunkLength
      )
    }

    return (await fileSystem.openReadableFile(url)).pipe(
      new Transform({
        objectMode: true,
        transform(data: Buffer, _, callback) {
          if (currentRowGroup < metadata.row_groups.length) {
            buffers.push(data)
            buffersCurrentLengthSum += data.length
          }
          let bufferConsumed = 0
          const rowGroupReady = isRowGroupReady()
          if (rowGroupReady) {
            buffers[0] = Buffer.concat(buffers)
            buffers.length = 1
            do {
              const rowGroup = metadata.row_groups[currentRowGroup++]
              const rowBuffer: { rowCount: number; columnData: Record<string, any> } = {
                rowCount: +rowGroup.num_rows,
                columnData: {},
              }
              for (const colChunk of rowGroup.columns) {
                const colKey = colChunk.meta_data.path_in_schema?.toString()
                const colChunkOffset = colChunk.meta_data.data_page_offset?.valueOf()
                const colChunkLength = colChunk.meta_data.total_compressed_size?.valueOf()
                const colChunkEndOffset =
                  colChunkOffset && colChunkLength ? colChunkOffset + colChunkLength : undefined
                if (colChunkEndOffset) bufferConsumed = colChunkEndOffset - buffersCurrentOffset
                if (
                  !colKey ||
                  colChunkOffset === undefined ||
                  !colChunkLength ||
                  !colChunkEndOffset
                ) {
                  continue
                }

                const dictOffset = colChunk.meta_data.dictionary_page_offset
                const dictLength = (reader.envelopeReader as any).default_dictionary_size
                if (dictOffset && dictLength) throw new Error('Dictionary not supported')

                const colChunkDataLen = Math.min(
                  reader.envelopeReader.fileSize - colChunkOffset,
                  colChunkLength
                )
                const colChunkData = buffers[0].subarray(
                  colChunkOffset - buffersCurrentOffset,
                  colChunkOffset - buffersCurrentOffset + colChunkDataLen
                )
                if (columnList.length > 0 && parquetUtil.fieldIndexOf(columnList, colKey) < 0) {
                  continue
                }

                const field = schema.findField(colKey)
                const opts = {
                  type: parquetUtil.getThriftEnum(parquetThrift.Type, colChunk.meta_data.type),
                  rLevelMax: field.rLevelMax,
                  dLevelMax: field.dLevelMax,
                  compression: parquetUtil.getThriftEnum(
                    parquetThrift.CompressionCodec,
                    colChunk.meta_data.codec
                  ),
                  column: field,
                  num_values: colChunk.meta_data.num_values,
                }
                rowBuffer.columnData[colKey] = (reader as any).decodePages(colChunkData, opts)
              }
              for (const row of ParquetShredder.materializeRecords(
                schema,
                rowBuffer
              ) as unknown as Array<Record<string, any>>) {
                this.push(row)
              }
            } while (isRowGroupReady())
            if (currentRowGroup === metadata.row_groups.length) {
              reader.close().catch((err) => {
                throw err
              })
            }
          }
          if (bufferConsumed) {
            buffers[0] = buffers[0].subarray(bufferConsumed)
            buffersCurrentLengthSum -= bufferConsumed
            buffersCurrentOffset += bufferConsumed
            bufferConsumed = 0
          }
          callback()
        },
      })
    )
  } else {
    const reader = await newParquetReader(fileSystem, url)
    const passThrough = new PassThrough({ objectMode: true })
    const closePassThrough = () => passThrough.push(null)
    const cursor = reader.getCursor(options?.columnList)
    const handleRecord = (record: RowInterface) => {
      if (!record) {
        reader
          .close()
          .then(closePassThrough)
          .catch((err) => {
            throw err
          })
      } else {
        passThrough.push(record)
        cursor
          .next()
          .then(handleRecord)
          .catch((err) => {
            throw err
          })
      }
    }
    cursor
      .next()
      .then(handleRecord)
      .catch((err) => {
        throw err
      })
    return StreamTree.readable(passThrough)
  }
}

export async function newParquetReader(
  fileSystem: FileSystem,
  url: string
): Promise<ParquetReader> {
  const envelopeReader = await newParquetEnvelopeReader(fileSystem, url)
  return (ParquetReader as any).openEnvelopeReader(envelopeReader)
}

export function newParquetEnvelopeReader(fileSystem: FileSystem, url: string) {
  const closeFn = () => ({})
  const fileStatFn = async () => (await fileSystem.getFileStatus(url)).size
  const readFn = async (byteOffset: number, byteLength: number, file: any) => {
    if (file) return Promise.reject('external references are not supported')
    const stream = await fileSystem.openReadableFile(url, { byteOffset, byteLength })
    return readableToBuffer(stream.finish())
  }
  // Needs ZJONSSON parquetjs
  return new ParquetEnvelopeReader(readFn as any, closeFn as any, fileStatFn as any)
}

export function pipeParquetFormatter(
  stream: WritableStreamTree,
  schema: ParquetSchema
): WritableStreamTree {
  return stream.pipeFrom(new ParquetTransformer(schema))
}
