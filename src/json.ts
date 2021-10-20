import * as readline from 'readline'
import { Duplex, Readable } from 'stream'
import through2 from 'through2'
import {
  finishReadable,
  finishWritable,
  pumpWritable,
  ReadableStreamTree,
  WritableStreamTree,
} from 'tree-stream'
import { FileSystem } from './fs'
import { hashStream, isShardedFilename, shardedFilename, shardIndex } from './util'

const JSONStream = require('JSONStream')

/**
 * Reads every line from a file.
 * @param url The URL of the file to read lines from.
 * @param map Callback called for each line.
 */
export async function readLines<X>(
  fileSystem: FileSystem,
  url: string,
  map: (x: string) => X
): Promise<X[]> {
  return mapLines(await fileSystem.openReadableFile(url), map)
}

/**
 * Reads every line from a file, treating the first line as a header.
 * @param url The URL of the file to read lines from.
 * @param map Callback called for every line succeeding the header.
 * @param header Callback called for the first line.
 */
export async function readLinesWithHeader<X, H>(
  fileSystem: FileSystem,
  url: string,
  map: (x: string) => X,
  header?: (x: string) => H,
  ret: X[] = []
): Promise<[H | undefined, X[]]> {
  return mapLinesWithHeader(await fileSystem.openReadableFile(url), map, header, ret)
}

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
 * Writes the string to a file.
 * @param url The URL of the file to serialize the string to.
 * @param value The string to serialize.
 */
export async function writeContent(fileSystem: FileSystem, url: string, value: string) {
  const stream = await fileSystem.openWritableFile(url)
  return new Promise<void>((resolve, reject) => {
    const out = finishWritable(stream, resolve, reject)
    out.write(value)
    out.end()
  })
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
  const shards = process.env.SHARD_MODULUS ? parseInt(process.env.SHARD_MODULUS, 10) : undefined
  if (shards && isShardedFilename(url)) return writeShardedJSONLines(fileSystem, url, obj, shards)

  const stream = await fileSystem.openWritableFile(url)
  return new Promise<void>((resolve, reject) => {
    const out = finishWritable(stream, resolve, reject)
    try {
      for (const x of obj) {
        out.write(JSON.stringify(x) + '\n')
      }
    } finally {
      out.end()
    }
  })
}

export async function writeShardedJSONLines(
  fileSystem: FileSystem,
  url: string,
  obj: object[],
  shards: number,
  shardFunction = (x: object, modulus: number) => shardIndex((x as any)?.guid ?? '', modulus)
) {
  const streams = await Promise.all(
    new Array(shards)
      .fill(undefined)
      .map((_, index) =>
        fileSystem.openWritableFile(shardedFilename(url, { index, modulus: shards }))
      )
  )
  const out = await Promise.all(streams.map((stream) => stream.finish()))
  try {
    for (const x of obj) {
      out[shardFunction(x, shards)].write(JSON.stringify(x) + '\n')
    }
  } finally {
    out.forEach((stream) => stream.end())
  }
}

export async function parseLines(
  stream: ReadableStreamTree,
  callback: (x: string) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const input = readline.createInterface({
      input: finishReadable(stream, resolve, reject),
    })
    input.on('line', callback)
  })
}

/**
 * Maps lines from [[stream]].  Used to implement [[readLines]].
 * @param stream The stream to read lines from.
 */
export async function mapLines<X>(stream: ReadableStreamTree, map: (x: string) => X): Promise<X[]> {
  const ret: X[] = []
  await parseLines(stream, (line) => ret.push(map(line)))
  return ret
}

/**
 * Parses lines (with header) from [[stream]].  Used to implement [[readLinesWithHeader]].
 * @param stream The stream to read lines from.
 */
export async function mapLinesWithHeader<X, H>(
  stream: ReadableStreamTree,
  map: (x: string) => X,
  header?: (y: string) => H,
  ret: X[] = []
): Promise<[H | undefined, X[]]> {
  return new Promise((resolve, reject) => {
    let hdr: H | undefined
    const input = readline.createInterface({
      input: stream.finish((err) => {
        if (err) reject(err)
        else resolve([hdr, ret])
      }),
    })
    input.on('line', (line) => {
      if (header && !hdr) hdr = header(line)
      else {
        const mapped = map(line)
        ret?.push(mapped)
      }
    })
  })
}

/**
 * Parses JSON object from [[stream]].  Used to implement [[readJSON]].
 * @param stream The stream to read a JSON object from.
 */
export async function parseJSON(stream: ReadableStreamTree) {
  let ret: unknown | undefined
  return new Promise((resolve, reject) => {
    stream = stream.pipe(JSONStream.parse())
    stream = stream.pipe(
      through2.obj((data, _, callback) => {
        ret = data
        callback()
      })
    )
    finishReadable(stream, resolve, reject, ret)
  })
}

/**
 * Serializes JSON object to [[stream]].  Used to implement [[writeJSON]].
 * @param stream The stream to write a JSON object to.
 */
export async function serializeJSON(
  stream: WritableStreamTree,
  obj: object | any[]
): Promise<boolean> {
  return serializeJSONStream(
    stream,
    Readable.from(Array.isArray(obj) ? obj : Object.entries(obj)),
    Array.isArray(obj)
  )
}

/**
 * Serializes [[readable]] to [[stream]].  Used to implement [[writeJSON]].
 * @param stream The stream to write a JSON object to.
 */
export async function serializeJSONStream(
  stream: WritableStreamTree,
  readable: Readable,
  isArray: boolean
): Promise<boolean> {
  return pumpWritable(stream.pipeFrom(createJSONFormatter(isArray)), true, readable)
}

/**
 * Create JSON formatter stream.
 * @param isArray Accept array objects or property tuples.
 */
export function createJSONFormatter(isArray: boolean): Duplex {
  return isArray
    ? JSONStream.stringify('[ ', ' , ', ' ]\n')
    : JSONStream.stringifyObject('{ ', ' , ', ' }\n')
}
