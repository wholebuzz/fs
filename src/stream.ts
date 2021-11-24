import SHA from 'sha.js'
import { Readable, Transform, Writable } from 'stream'
import StreamTree, { ReadableStreamTree, WritableStreamTree } from 'tree-stream'

export async function readableToString(stream: Readable): Promise<string> {
  return (await readableToBuffer(stream)).toString('utf8')
}

export function readableToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)))
    stream.on('error', (err: Error) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

export function writableToString(target: { value: string }): WritableStreamTree {
  const chunks: Buffer[] = []
  const stream = new Writable({
    write(chunk, _encoding, callback) {
      chunks.push(Buffer.from(chunk))
      callback()
    },
  })
  stream.on('finish', () => (target.value = Buffer.concat(chunks).toString('utf8')))
  return StreamTree.writable(stream)
}

/**
 * Create filter stream.
 */
export function pipeFilter(stream: ReadableStreamTree, filter: (x: any) => any) {
  return stream.pipe(
    new Transform({
      objectMode: true,
      transform(data, _, callback) {
        const filtered = filter(data)
        if (filtered) this.push(filtered)
        callback()
      },
    })
  )
}

/**
 * Create filter stream.
 */
export function pipeFromFilter(stream: WritableStreamTree, filter: (x: any) => any) {
  return stream.pipeFrom(
    new Transform({
      objectMode: true,
      transform(data, _, callback) {
        const filtered = filter(data)
        if (filtered) this.push(filtered)
        callback()
      },
    })
  )
}

/**
 * Split input by shardFunction
 */
export function shardWritables(
  writable: WritableStreamTree[],
  shards?: number,
  shardFunction?: (x: object, modulus: number) => number
) {
  if (writable.length === 1) return writable[0]
  if (!writable.length || !shards || !shardFunction) throw new Error('No shards')
  const ret = StreamTree.writable(
    new Writable({
      objectMode: true,
      write(x: object, _encoding, callback: () => void) {
        const shard = shardFunction(x, shards)
        writable[shard].node.stream.write(x)
        callback()
      },
    }).on('finish', () => {
      for (const stream of writable) stream.node.stream.end()
    })
  )
  for (const stream of writable) {
    stream.pipedFrom(ret)
    stream.finish()
  }
  return ret
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
        new Transform({
          objectMode: true,
          transform(data, _, callback) {
            hash.update(data)
            callback()
          },
        })
      )
      .on('error', reject)
      .on('finish', () => {
        resolve(hash.digest('hex'))
      })
  })
}
