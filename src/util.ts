import * as crypto from 'crypto'
import { ReadableStreamTree } from 'tree-stream'
import { FileSystem, OpenReadableFileOptions, OpenWritableFileOptions } from './fs'

export const zlib = require('zlib')
export const md5 = (x: string) => crypto.createHash('md5').update(x).digest('hex')

export const logger = {
  debug: (...args: any[]) => console.log(...args),
  error: (...args: any[]) => console.log(...args),
  info: (...args: any[]) => console.log(...args),
}

export interface ReadableFileSpec {
  url: string
  format?: string
  options?: OpenReadableFileOptions & { shards?: number }
}

export interface Shard {
  index: number
  modulus: number
}

export const shardIndex = (text: string, modulus: number) =>
  parseInt(md5(text ?? '').slice(-4), 16) % modulus

export const shardMatchText = (text: string, shard: Shard) =>
  shardIndex(text, shard.modulus) === shard.index

export const isShardedFilename = (name: string) => name.match(/\-(S+)\-of\-(N+)/)?.[1].length

export const shardedFilename = (name: string, shard: Shard) => {
  const of = name.lastIndexOf('-of-')
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

export const shardedFilenames = (name: string, shards: number) =>
  new Array(shards)
    .fill(undefined)
    .map((_, index) => shardedFilename(name, { index, modulus: shards }))

export async function openReadableFileSet(
  fileSystem: FileSystem,
  fileNames: ReadableFileSpec[] | Record<string, ReadableFileSpec>
) {
  const ret: Record<string, ReadableStreamTree[]> = {}
  for (const [key, spec] of Object.entries(fileNames)) {
    ret[key] = await openReadableFiles(fileSystem, spec.url, spec.options)
  }
  return ret
}

export async function openReadableFiles(
  fileSystem: FileSystem,
  url: string,
  options?: OpenReadableFileOptions & { shards?: number }
) {
  if (!options?.shards || !isShardedFilename(url)) {
    return [await fileSystem.openReadableFile(url, options)]
  }
  return Promise.all(
    shardedFilenames(url, options.shards!).map((filename) =>
      fileSystem.openReadableFile(filename, options)
    )
  )
}

export async function openWritableFiles(
  fileSystem: FileSystem,
  url: string,
  options?: OpenWritableFileOptions & { shards?: number }
) {
  if (!options?.shards || !isShardedFilename(url)) {
    return [await fileSystem.openWritableFile(url, options)]
  }
  return Promise.all(
    shardedFilenames(url, options.shards!).map((filename) =>
      fileSystem.openWritableFile(filename, options)
    )
  )
}
