import { ParquetEnvelopeReader, ParquetReader, ParquetSchema, ParquetTransformer } from 'parquetjs'
import { RowInterface } from 'parquetjs/lib/row.interface'
import { PassThrough } from 'stream'
import StreamTree, { ReadableStreamTree, WritableStreamTree } from 'tree-stream'
import { FileSystem } from './fs'
import { readableToBuffer } from './stream'
import {
  isShardedFilename,
  openReadableFiles,
  ReadableFileOptions,
  ReadableFileSpec,
  shardedFilenames,
  streamToArray,
} from './util'

export interface OpenParquetFileOptions {
  columnList?: string[][] | string[]
}

export interface ParquetFileOptions {
  columnList?: string[][] | string[]
  shards?: number
  shardFilter?: (index: number) => boolean
}

export interface ReadableSpec extends ReadableFileSpec {
  options?: ReadableFileOptions & OpenParquetFileOptions
}

export async function readParquetFile(
  fileSystem: FileSystem,
  url: string,
  options?: OpenParquetFileOptions
) {
  return streamToArray(await openParquetFile(fileSystem, url, options))
}

export async function openReadableFileSet(
  fileSystem: FileSystem,
  fileNames: ReadableFileSpec[] | Record<string, ReadableSpec>
) {
  const ret: Record<string, ReadableStreamTree[]> = {}
  for (const [key, spec] of Object.entries(fileNames)) {
    ret[key] =
      spec.format === 'parquet' && !spec.options?.query
        ? await openParquetFiles(fileSystem, spec.url, spec.options)
        : await openReadableFiles(fileSystem, spec.url, spec.options)
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
  const reader = await newParquetReader(fileSystem, url)
  const passThrough = new PassThrough({ objectMode: true })
  const closePassThrough = () => passThrough.push(null)
  const cursor = reader.getCursor(options?.columnList)
  const handleRecord = (record: RowInterface) => {
    if (!record) {
      reader.close().then(closePassThrough)
    } else {
      passThrough.push(record)
      cursor.next().then(handleRecord)
    }
  }
  cursor.next().then(handleRecord)
  return StreamTree.readable(passThrough)
}

export async function newParquetReader(fileSystem: FileSystem, url: string) {
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
