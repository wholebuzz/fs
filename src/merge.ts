import MinHeap from 'mnemonist/heap'
import { PassThrough, Transform } from 'stream'
import StreamTree, { ReadableStreamTree } from 'tree-stream'

export interface MergeStreamsOptions {
  compare?: (a: Record<string, any>, b: Record<string, any>) => number
  labelSource?: string
}

export function mergeStreams(
  inputs: ReadableStreamTree[] | Record<string, ReadableStreamTree>,
  options?: MergeStreamsOptions
) {
  const entries = Array.from(Object.entries(inputs))
  if (entries.length === 1) return entries[0][1]
  if (!entries.length) throw new Error('No input')

  let finished = 0
  const compare = options?.compare
  const heap = new MinHeap<HeapItem>(compare ? (a, b) => compare(a.value, b.value) : undefined)
  const stream = new PassThrough({ objectMode: true })
  const ret = StreamTree.readable(stream)
  const deque = () => {
    if (heap.size < entries.length - finished) return
    const item = heap.pop()!
    stream.write(options?.labelSource ? { source: item.source, value: item.value } : item.value)
    item.cb()
  }
  for (const [source, input] of entries) {
    input
      .pipe(
        new Transform({
          objectMode: true,
          transform: (x, _encoding, cb) => {
            heap.push({
              source,
              value: x,
              cb,
            })
            deque()
          },
        }).on('finish', () => {
          finished++
          if (finished === entries.length) stream.end()
          else deque()
        })
      )
      .piped(ret)
  }
  return ret
}

interface HeapItem {
  source: string
  value: any
  cb: () => void
}
