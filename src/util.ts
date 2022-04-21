import * as crypto from 'crypto'
import * as path from 'path'
import { ReadableStreamTree } from 'tree-stream'
import { FileSystem, OpenReadableFileOptions, OpenWritableFileOptions } from './fs'

export const zlib = require('zlib')
export const lastItem = <X>(x: X[]): X => x[x.length - 1]
export const lastItemOrNull = <X>(x: X[]): X | null => (x.length > 0 ? x[x.length - 1] : null)
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
  shardFunction?: (key: string) => string
) => parseInt((shardFunction ?? md5)(text ?? '').slice(-4), 16) % modulus

export const shardMatchText = (
  text: string,
  shard: Shard,
  shardFunction?: (key: string) => string
) => shardIndex(text, shard.modulus, shardFunction) === shard.index

export const shardedRegex = /\-(S+)\-of\-(N+)/
export const shardRegex = /\-(\d+)\-of\-(\d+)/g
export const isShardedFilename = (name: string) => name.match(shardedRegex)?.[1].length
export const isShardFilename = (name: string) =>
  parseInt(name.match(shardRegex)?.pop()?.split('-')?.pop() || '0', 10)
export const shardIndexOfFilename = (name: string) =>
  parseInt(name.match(shardRegex)?.pop()?.split('-')?.[1] || '0', 10)

export function allShardsFilename(name: string) {
  const lastMatch = name.match(shardRegex)?.pop()
  if (!lastMatch) return name
  const index = name.lastIndexOf(lastMatch)
  return name.substring(0, index) + '-SSSS-of-NNNN' + name.substring(index + lastMatch.length)
}

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
  const suffix =
    shardedFilenameMatch?.[0] && shardedFilenameMatch?.index !== undefined
      ? filename.substring(shardedFilenameMatch[0].length + shardedFilenameMatch.index)
      : undefined
  let entries = await fileSystem.readDirectory(dirname, { prefix })
  if (suffix) entries = entries.filter((entry) => entry.url.endsWith(suffix))
  if (!entries.length) {
    throw new Error(
      `readShardFilenames: no files in ${dirname} matching ${JSON.stringify({ prefix, suffix })}`
    )
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
    throw new Error(
      `readShardFilenames: wrong number ${dirname} matching ${JSON.stringify({ prefix, suffix })}`
    )
  }
  const haveEntry = entries.map(() => false)
  entries.forEach((x) => {
    const index = shardIndexOfFilename(x.url)
    if (index >= 0 && index < haveEntry.length) haveEntry[index] = true
  })
  if (!entries.every((x) => !!x)) {
    throw new Error(
      `readShardFilenames: corrupt ${dirname} matching ${JSON.stringify({ prefix, suffix })}`
    )
  }
  return { numShards, entries }
}

export async function waitForCompleteShardedInput(
  fileSystem: FileSystem,
  url: string,
  args: {
    shards?: number
    maxTrys?: number
    delay?: (trys: number) => number
  }
) {
  for (let trys = 1; trys < (args.maxTrys ?? 100); trys++) {
    try {
      const shuffleShards = await readShardFilenames(fileSystem, url)
      if (!args.shards || shuffleShards.numShards === args.shards) return
    } catch (err) {
      /* */
    }
    const delay = args.delay ? args.delay(trys) : 1000
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
  throw new Error(`waitForCompleteShardedInput timeout $url`)
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
