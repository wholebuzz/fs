import SHA from 'sha.js'
import { Readable } from 'stream'
import through2 from 'through2'

export const zlib = require('zlib')

export const logger = {
  debug: (...args: any[]) => console.log(...args),
  error: (...args: any[]) => console.log(...args),
  info: (...args: any[]) => console.log(...args),
}

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
