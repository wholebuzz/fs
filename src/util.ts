import * as crypto from 'crypto'
import * as path from 'path'
import { ReadableStreamTree } from 'tree-stream'
import { FileSystem, OpenReadableFileOptions, OpenWritableFileOptions } from './fs'

export const zlib = require('zlib')
export const md5 = (x: string) => crypto.createHash('md5').update(x).digest('hex')

export interface Logger {
  debug: (...args: any[]) => void
  error: (...args: any[]) => void
  info: (...args: any[]) => void
}

export const logger: Logger = {
  debug: (...args: any[]) => console.log(...args),
  error: (...args: any[]) => console.log(...args),
  info: (...args: any[]) => console.log(...args),
}

export interface WritableFileOptions extends OpenWritableFileOptions {
  shards?: number
  shardFilter?: (index: number) => boolean
}

export interface ReadableFileOptions extends OpenReadableFileOptions {
  shards?: number
  shardFilter?: (index: number) => boolean
}

export interface ReadableFileSpec {
  url?: string
  format?: string
  options?: ReadableFileOptions
  stream?: ReadableStreamTree[]
}

export interface Shard {
  index: number
  modulus: number
}

export const shardIndex = (
  text: string,
  modulus: number,
  shardFunction?: (key: string) => string,
) => parseInt((shardFunction ?? md5)(text ?? '').slice(-4), 16) % modulus

export const shardMatchText = (text: string, shard: Shard, shardFunction?: (key: string) => string) =>
  shardIndex(text, shard.modulus, shardFunction) === shard.index

export const shardRegex = /\-(\d+)\-of\-(\d+)/
export const shardedRegex = /\-(S+)\-of\-(N+)/
export const isShardFilename = (name: string) => parseInt(name.match(shardRegex)?.[2] || '0', 10)
export const isShardedFilename = (name: string) => name.match(shardedRegex)?.[1].length
export const allShardsFilename = (name: string) => name.replace(shardRegex, '-SSSS-of-NNNN')

export const shardedFilename = (name: string, shard: Shard) => {
  const sharded = name.match(shardedRegex)
  const of = sharded ? name.indexOf('-of-', sharded.index) : name.lastIndexOf('-of-')
  const leading = name.lastIndexOf('-', of - 1)
  const digits = of - leading - 1
  return digits <= 0
    ? name
    : name.substring(0, leading + 1) +
        `${shard.index}`.padStart(digits, '0') +
        '-of-' +
        `${shard.modulus}`.padStart(digits, '0') +
        name.substring(of + 4 + digits)
}

export const shardedFilenames = (
  name: string,
  shards: number,
  filter?: (index: number) => boolean
) =>
  new Array(shards)
    .fill(undefined)
    .map((_, index) => shardedFilename(name, { index, modulus: shards }))
    .filter(filter ? (_, index) => filter(index) : () => true)

export async function readShardFilenames(fileSystem: FileSystem, url: string) {
  const dirname = path.dirname(url) + '/'
  const filename = path.basename(url)
  const shardedFilenameMatch = filename.match(shardedRegex)
  const prefix = filename.substring(0, (shardedFilenameMatch?.index ?? -2) + 1)
  const entries = await fileSystem.readDirectory(dirname, { prefix })
  if (!entries.length) {
    throw new Error(`readShardFilenames: no files in ${dirname} matching ${prefix}`)
  }
  let numShards = 0
  for (const entry of entries) {
    const urlNumShards = isShardFilename(entry.url)
    if (!numShards) numShards = urlNumShards
    if (!urlNumShards || urlNumShards !== numShards) {
      throw new Error(`readShardFilenames: mismatching shard ${url}`)
    }
  }
  if (numShards !== entries.length) {
    throw new Error(`readShardFilenames: too many ${dirname} matching ${prefix}`)
  }
  return { numShards, entries }
}

export async function openReadableFileSet(
  fileSystem: FileSystem,
  fileNames: ReadableFileSpec[] | Record<string, ReadableFileSpec>
) {
  const ret: Record<string, ReadableStreamTree[]> = {}
  for (const [key, spec] of Object.entries(fileNames)) {
    ret[key] = spec.stream
      ? spec.stream
      : await openReadableFiles(fileSystem, spec.url!, spec.options)
  }
  return ret
}

export async function openReadableFiles(
  fileSystem: FileSystem,
  url: string,
  options?: ReadableFileOptions
) {
  if (!options?.shards || !isShardedFilename(url)) {
    return [await fileSystem.openReadableFile(url, options)]
  }
  return Promise.all(
    shardedFilenames(url, options.shards!, options.shardFilter).map((filename) =>
      fileSystem.openReadableFile(filename, options)
    )
  )
}

export async function openWritableFiles(
  fileSystem: FileSystem,
  url: string,
  options?: WritableFileOptions
) {
  if (!options?.shards || !isShardedFilename(url)) {
    return [await fileSystem.openWritableFile(url, options)]
  }
  return Promise.all(
    shardedFilenames(url, options.shards!, options.shardFilter).map((filename) =>
      fileSystem.openWritableFile(filename, options)
    )
  )
}
