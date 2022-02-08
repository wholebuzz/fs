import * as csv from 'csv'
import { Options as CSVParseOptions } from 'csv-parse'
import { Options as CSVFormatOptions } from 'csv-stringify'
import { Readable } from 'stream'
import StreamTree, { pumpWritable, ReadableStreamTree, WritableStreamTree } from 'tree-stream'
import { FileSystem } from './fs'
import { readableToArray } from './stream'

/**
 * Create CSV parser stream.
 */
export function pipeCSVParser(
  stream: ReadableStreamTree,
  options?: CSVParseOptions
): ReadableStreamTree {
  return stream.pipe(csv.parse(options))
}

/**
 * Create CSV formatter stream.
 */
export function pipeCSVFormatter(
  stream: WritableStreamTree,
  options?: CSVFormatOptions
): WritableStreamTree {
  return stream.pipeFrom(options ? csv.stringify(options) : csv.stringify())
}

/**
 * Parses CSV from [[stream]].  Used to implement [[readCSV]].
 * @param stream The stream to read a CSV object from.
 */
export async function parseCSV(stream: ReadableStreamTree, options?: CSVParseOptions) {
  return readableToArray(pipeCSVParser(stream, options))
}

/**
 * Reads a serialized JSON object or array from a file.
 * @param url The URL of the file to parse a JSON object or array from.
 */
export async function readCSV(fileSystem: FileSystem, url: string, options?: CSVParseOptions) {
  return parseCSV(await fileSystem.openReadableFile(url), options)
}

/**
 * Serializes CSV object to [[stream]].  Used to implement [[writeCSV]].
 * @param stream The stream to write a CSV object to.
 */
export async function serializeCSV(
  stream: WritableStreamTree,
  obj: any[],
  options?: CSVFormatOptions
): Promise<boolean> {
  return pumpWritable(pipeCSVFormatter(stream, options), true, StreamTree.readable(Readable.from(obj)))
}

/**
 * Serializes object or array to a CSV file.
 * @param url The URL of the file to serialize a CSV object or array to.
 * @param value The object or array to serialize.
 */
export async function writeCSV(
  fileSystem: FileSystem,
  url: string,
  value: any[],
  options?: CSVFormatOptions
) {
  return serializeCSV(await fileSystem.openWritableFile(url), value, options)
}
