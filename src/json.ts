import ndjson from 'ndjson'
import { Readable, Transform } from 'stream'
import { parser } from 'stream-json'
import { streamArray } from 'stream-json/streamers/StreamArray'
import { streamObject } from 'stream-json/streamers/StreamObject'
import { pumpReadable, pumpWritable, ReadableStreamTree, WritableStreamTree } from 'tree-stream'
import { FileSystem } from './fs'
import { hashStream, pipeFilter, shardWritables } from './stream'
import { openWritableFiles, shardIndex } from './util'

export const JSONStream = require('JSONStream')

/**
 * Reads a serialized JSON object or array from a file.
 * @param url The URL of the file to parse a JSON object or array from.
 */
export async function readJSON(fileSystem: FileSystem, url: string) {
  return parseJSON(await fileSystem.openReadableFile(url))
}

/**
 * Reads a serialized JSON object from a file, and also hashes the file.
 * @param url The URL of the file to parse a JSON object from.
 */
export async function readJSONHashed(fileSystem: FileSystem, url: string) {
  const readStream = await fileSystem.openReadableFile(url)
  const [readClone1, readClone2] = readStream.split()
  return Promise.all([parseJSON(readClone1), hashStream(readClone2.finish())])
}

/**
 * Reads a serialized JSON-lines array from a file.
 * @param url The URL of the file to parse a JSON object or array from.
 */
export async function readJSONLines(fileSystem: FileSystem, url: string) {
  return parseJSONLines(await fileSystem.openReadableFile(url))
}

/**
 * Serializes object or array to a JSON file.
 * @param url The URL of the file to serialize a JSON object or array to.
 * @param value The object or array to serialize.
 */
export async function writeJSON(fileSystem: FileSystem, url: string, value: object | any[]) {
  return serializeJSON(await fileSystem.openWritableFile(url), value)
}

/**
 * Serializes array to a JSON Lines file.
 * @param url The URL of the file to serialize a JSON array to.
 * @param value The array to serialize.
 */
export async function writeJSONLines(fileSystem: FileSystem, url: string, obj: object[]) {
  return serializeJSONLines(await fileSystem.openWritableFile(url), obj)
}

export async function writeShardedJSONLines(
  fileSystem: FileSystem,
  url: string,
  obj: object[],
  shards: number,
  shardFunction = (x: object, modulus: number) => shardIndex((x as any)?.guid ?? '', modulus)
) {
  const streams = await openWritableFiles(fileSystem, url, { shards })
  return serializeJSONLines(shardWritables(streams, shards, shardFunction), obj)
}

/**
 * Parses JSON object from [[stream]].  Used to implement [[readJSON]].
 * @param stream The stream to read a JSON object from.
 */
export async function parseJSON(stream: ReadableStreamTree) {
  let ret: unknown | undefined
  stream = stream.pipe(JSONStream.parse())
  stream = stream.pipe(
    new Transform({
      objectMode: true,
      transform(data, _, callback) {
        ret = data
        callback()
      },
    })
  )
  await pumpReadable(stream, undefined)
  return ret
}

/**
 * Parses JSON object from [[stream]].  Used to implement [[readJSON]].
 * @param stream The stream to read a JSON object from.
 */
export async function parseJSONLines(stream: ReadableStreamTree) {
  const ret: unknown[] = []
  stream = pipeJSONLinesParser(stream)
  stream = stream.pipe(
    new Transform({
      objectMode: true,
      transform(data, _, callback) {
        ret.push(data)
        callback()
      },
    })
  )
  return pumpReadable(stream, ret)
}

/**
 * Serializes JSON object to [[stream]].  Used to implement [[writeJSON]].
 * @param stream The stream to write a JSON object to.
 */
export async function serializeJSON(
  stream: WritableStreamTree,
  obj: object | any[]
): Promise<boolean> {
  return pumpWritable(
    pipeJSONFormatter(stream, Array.isArray(obj)),
    true,
    Readable.from(Array.isArray(obj) ? obj : Object.entries(obj))
  )
}

/**
 * Serializes JSON object to [[stream]].  Used to implement [[writeJSONLines]].
 * @param stream The stream to write a JSON object to.
 */
export async function serializeJSONLines(stream: WritableStreamTree, obj: any[]): Promise<boolean> {
  return pumpWritable(pipeJSONLinesFormatter(stream), true, Readable.from(obj))
}

/**
 * Create JSON parser stream.
 */
export function pipeJSONParser(stream: ReadableStreamTree, isArray: boolean): ReadableStreamTree {
  stream = stream.pipe(parser()).pipe(isArray ? streamArray() : streamObject())
  if (isArray) stream = pipeFilter(stream, (data) => data.value)
  return stream
}

/**
 * Create JSON parser stream.
 */
export function pipeJSONLinesParser(stream: ReadableStreamTree): ReadableStreamTree {
  return stream.pipe(ndjson.parse())
}

/**
 * Create JSON formatter stream.
 * @param isArray Accept array objects or property tuples.
 */
export function pipeJSONFormatter(
  stream: WritableStreamTree,
  isArray: boolean
): WritableStreamTree {
  return stream.pipeFrom(
    isArray
      ? JSONStream.stringify('[ ', ' , ', ' ]\n')
      : JSONStream.stringifyObject('{ ', ' , ', ' }\n')
  )
}

/**
 * Create JSON-lines formatter stream.
 * @param isArray Accept array objects or property tuples.
 */
export function pipeJSONLinesFormatter(stream: WritableStreamTree): WritableStreamTree {
  return stream.pipeFrom(ndjson.stringify())
}
