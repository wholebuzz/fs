import { PassThrough } from 'stream'
import { createBuilder, Example, Reader, Writer } from 'tfrecord-stream'
import { RecordReader } from 'tfrecord-stream/lib/record_reader'
import { RecordWriter } from 'tfrecord-stream/lib/record_writer'
import through2 from 'through2'
import StreamTree, { ReadableStreamTree, WritableStreamTree } from 'tree-stream'
import { TextDecoder, TextEncoder } from 'util'
import { FileStatus, FileSystem } from './fs'

export { Example, Reader, Writer }

/**
 * Creates a .tfrecord file reader using arbitrary buffers instead of protobuf.
 * @param url The URL of the file.tfbinary to read records from.
 */
export async function createBinaryRecordReader(fileSystem: FileSystem, url: string) {
  return RecordReader.createFromStream((await fileSystem.openReadableFile(url)).finish())
}

/**
 * Creates a .tfrecord file writer using arbitrary buffers instead of protobuf.
 * @param url The URL of the file.tfbinary to read records from.
 */
export async function createBinaryRecordWriter(fileSystem: FileSystem, url: string) {
  return RecordWriter.createFromStream((await fileSystem.openWritableFile(url)).finish())
}

/**
 * Reads records from .tfrecord file.
 * @param stream Readable stream of the file.tfrecord to read records from.
 */
export async function pipeTfRecordParser(
  stream: ReadableStreamTree,
  parse: (x: Example) => Record<string, any> = (x) => parseTfExample(x)
): Promise<ReadableStreamTree> {
  const reader = await Reader.createFromStream(stream.finish())
  const passThrough = new PassThrough({ objectMode: true })
  const closePassThrough = () => passThrough.push(null)
  const handleExample = (example: Example | null) => {
    if (!example || !example.features || !example.features.feature) {
      closePassThrough()
    } else {
      passThrough.push(parse(example))
      reader.readExample().then(handleExample).catch(closePassThrough)
    }
  }
  reader.readExample().then(handleExample).catch(closePassThrough)
  return StreamTree.readable(passThrough)
}

/**
 * Create tfrecord writer stream.
 */
export async function pipeTfRecordFormatter(
  stream: WritableStreamTree,
  format: (x: Record<string, any>) => Example = (x) => makeTfExample(x)
): Promise<WritableStreamTree> {
  const writer = await Writer.createFromStream(stream.finish())
  return StreamTree.writable(
    through2.obj((data, _, callback) => writer.writeExample(format(data)).then(callback))
  )
}

/**
 * Appends a record to a .tfrecord file.
 * @param url The URL of the file.tfrecord to append a record to.
 */
export async function appendTfRecord(
  fileSystem: FileSystem,
  urlText: string,
  record: Record<string, any>
): Promise<FileStatus | null> {
  const example = makeTfExample(record)
  return fileSystem.appendToFile(
    urlText,
    StreamTree.writer(async (stream) => {
      const writer = await Writer.createFromStream(stream)
      await writer.writeExample(example)
      await writer.close()
    })
  )
}

export function parseTfExample(example: Example): Record<string, any> {
  const record: Record<string, any> = {}
  const decoder = new TextDecoder()
  const feature = example.features?.feature ?? {}
  for (const key of Object.keys(feature)) {
    const value = feature[key]
    if (value.int64List?.value) {
      record[key] = value.int64List.value.map((x) => (typeof x === 'number' ? x : x.low))
    } else if (value.bytesList?.value) {
      record[key] = value.bytesList.value.map((x) => decoder.decode(x))
    } else {
      continue
    }
    if (record[key].length === 1) record[key] = record[key][0]
  }
  return record
}

/**
 * Creates a TF [[Example]] from a dictionary.
 * @param record The object to serialize.
 * @param floatSuffix Key suffix indicating floating point data.
 */
export function makeTfExample(record: Record<string, any>, floatSuffix = '_float'): Example {
  const builder = createBuilder()
  const encoder = new TextEncoder()
  for (const key of Object.keys(record)) {
    const value = record[key]
    if (!value) continue
    if (Array.isArray(value)) {
      if (typeof value[0] === 'number') {
        if (key.endsWith(floatSuffix)) {
          builder.setFloats(key, value)
        } else {
          builder.setIntegers(key, value)
        }
      } else {
        if (value[0] instanceof Uint8Array) {
          builder.setBinaries(key, value)
        } else if (typeof value[0] === 'string') {
          builder.setBinaries(key, value.map(encoder.encode))
        } else {
          builder.setBinaries(
            key,
            value.map((x) => encoder.encode(JSON.stringify(x)))
          )
        }
      }
    } else {
      if (typeof value === 'number') {
        if (key.endsWith(floatSuffix)) {
          builder.setFloat(key, value)
        } else {
          builder.setInteger(key, value)
        }
      } else {
        if (value instanceof Uint8Array) {
          builder.setBinary(key, value)
        } else if (typeof value === 'string') {
          builder.setBinary(key, encoder.encode(value))
        } else {
          builder.setBinary(key, encoder.encode(JSON.stringify(value)))
        }
      }
    }
  }
  return builder.releaseExample()
}
