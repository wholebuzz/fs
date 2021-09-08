import * as crypto from 'crypto'
import SHA from 'sha.js'
import { Readable } from 'stream'
import through2 from 'through2'

export const zlib = require('zlib')

export const logger = {
  debug: (...args: any[]) => console.log(...args),
  error: (...args: any[]) => console.log(...args),
  info: (...args: any[]) => console.log(...args),
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

export const md5 = (x: string) => crypto.createHash('md5').update(x).digest('hex')

/**
 * Hashes a [[Readable]] stream.
 * @param stream The stream to compute the hash of.
 */
export async function hashStream(stream: Readable): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const hash = new SHA.sha512()
    stream
      .on('error', reject)
      .pipe(
        through2.obj((data, _, callback) => {
          hash.update(data)
          callback()
        })
      )
      .on('error', reject)
      .on('finish', () => {
        resolve(hash.digest('hex'))
      })
  })
}
