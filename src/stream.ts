import SHA from 'sha.js'
import { Readable, Transform, Writable } from 'stream'
import StreamTree, { pumpReadable, ReadableStreamTree, WritableStreamTree } from 'tree-stream'

export const openNullReadable = (options?: { objectMode?: boolean }) =>
  StreamTree.readable(
    new Readable({
      objectMode: options?.objectMode,
      read(_size) {
        this.push(null)
      },
    })
  )

export const openNullWritable = (options?: { objectMode?: boolean }) =>
  StreamTree.writable(
    new Writable({
      objectMode: options?.objectMode,
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
 * Create sync or async filter stream.
 */
export function streamFilter(filter: (x: any) => any) {
  return new Transform({
    objectMode: true,
    transform(data, _, callback) {
      handleAsyncFunctionCallback(filter(data), callback, (filtered) => {
        if (filtered) this.push(filtered)
      })
    },
  })
}

/**
 * Create sync filter stream.
 */
export function streamSyncFilter(filter: (x: any) => any) {
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
 * Pipe sync filter stream.
 */
export function pipeSyncFilter(stream: ReadableStreamTree, filter: (x: any) => any) {
  return stream.pipe(streamSyncFilter(filter))
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
 * Pipe from sync filter stream.
 */
export function pipeFromSyncFilter(stream: WritableStreamTree, filter: (x: any) => any) {
  return stream.pipeFrom(streamSyncFilter(filter))
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
export function shardReadable(
  input: ReadableStreamTree,
  shards?: number,
  shardFunction?: (x: object, modulus: number) => number
) {
  if (!shards || shards === 1) return [input]
  if (!shardFunction) throw new Error('No shards')
  return input
    .split(shards)
    .map((stream, i) =>
      stream.pipe(streamFilter((x) => (shardFunction(x, shards) === i ? x : undefined)))
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
  if (!writable.length || !shards || !shardFunction) {
    throw new Error(`No shards for writable of length ${writable.length}`)
  }
  const waiting: Array<(() => void) | undefined> = new Array(writable.length).fill(undefined)
  for (let i = 0; i < writable.length; i++) {
    writable[i].node.stream.on('drain', () => {
      const cb = waiting[i]
      waiting[i] = undefined
      if (cb) cb()
    })
  }
  const ret = StreamTree.writable(
    new Writable({
      objectMode: true,
      write(x: object, _encoding, callback: () => void) {
        const shard = shardFunction(x, shards)
        if (writable[shard].node.stream.write(x)) {
          callback()
        } else {
          waiting[shard] = callback
        }
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

export function handleAsyncFunctionCallback<X>(
  running: X | Promise<X>,
  callback: (err?: Error) => void,
  success?: (x: X) => void
) {
  if (running && (running as any).then) {
    ;(running as Promise<X>)
      .then((x) => {
        success?.(x)
        callback()
      })
      .catch((err) => callback(err))
  } else {
    success?.(running as X)
    callback()
  }
}
