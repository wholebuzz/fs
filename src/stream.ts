import { Readable, Writable } from 'stream'
import through2 from 'through2'
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
    through2.obj(function (data, _, callback) {
      const filtered = filter(data)
      if (filtered) this.push(filtered)
      callback()
    })
  )
}

/**
 * Create filter stream.
 */
export function pipeFromFilter(stream: WritableStreamTree, filter: (x: any) => any) {
  return stream.pipeFrom(
    through2.obj(function (data, _, callback) {
      const filtered = filter(data)
      if (filtered) this.push(filtered)
      callback()
    })
  )
}
