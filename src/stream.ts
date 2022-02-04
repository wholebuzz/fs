import SHA from 'sha.js'
import { Readable, Transform, Writable } from 'stream'
import StreamTree, { pumpReadable, ReadableStreamTree, WritableStreamTree } from 'tree-stream'

export const openNullReadable = () =>
  StreamTree.readable(
    new Readable({
      read(_size) {
        this.push(null)
      },
    })
  )

export const openNullWritable = () =>
  StreamTree.writable(
    new Writable({
      write(_chunk, _encoding, done) {
        done()
      },
    })
  )

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

export async function readableToArray(stream: ReadableStreamTree) {
  const ret: unknown[] = []
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

export async function readableToValue(stream: ReadableStreamTree) {
  let ret: unknown | undefined
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
export function streamFilter(filter: (x: any) => any) {
  return new Transform({
    objectMode: true,
    transform(data, _, callback) {
      const filtered = filter(data)
      if (filtered) this.push(filtered)
      callback()
    },
  })
}

/**
 * Create async filter stream.
 */
export function streamAsyncFilter(filter: (x: any) => any) {
  return new Transform({
    objectMode: true,
    transform(data, _, callback) {
      Promise.resolve(filter(data))
        .then((filtered) => {
          if (filtered) this.push(filtered)
          callback()
        })
        .catch((err) => {
          throw err
        })
    },
  })
}

/**
 * Pipe filter stream.
 */
export function pipeFilter(stream: ReadableStreamTree, filter: (x: any) => any) {
  return stream.pipe(streamFilter(filter))
}

/**
 * Pipe async filter stream.
 */
export function pipeAsyncFilter(stream: ReadableStreamTree, filter: (x: any) => any) {
  return stream.pipe(streamAsyncFilter(filter))
}

/**
 * Pipe from filter stream.
 */
export function pipeFromFilter(stream: WritableStreamTree, filter: (x: any) => any) {
  return stream.pipeFrom(streamFilter(filter))
}

/**
 * Pipe from async filter stream.
 */
export function pipeFromAsyncFilter(stream: WritableStreamTree, filter: (x: any) => any) {
  return stream.pipeFrom(streamAsyncFilter(filter))
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
