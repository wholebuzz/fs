import MinHeap from 'mnemonist/heap'
import { PassThrough, Transform } from 'stream'
import StreamTree, { ReadableStreamTree } from 'tree-stream'

export interface MergeStreamsOptions {
  compare?: (a: Record<string, any>, b: Record<string, any>) => number
  labelSource?: string
}

export function mergeStreams(
  readable: ReadableStreamTree[] | Record<string, ReadableStreamTree | ReadableStreamTree[]>,
  options?: MergeStreamsOptions
): ReadableStreamTree {
  const entries = Array.from(Object.entries(readable))
  if (entries.length === 1) {
    if (Array.isArray(entries[0][1])) {
      if (entries[0][1].length === 1) return entries[0][1][0]
    } else {
      return entries[0][1]
    }
  }
  if (!entries.length) throw new Error('No input')

  let finished = 0
  const total = entries.reduce((pv, cv) => pv + (Array.isArray(cv[1]) ? cv[1].length : 1), 0)
  const compare = options?.compare
  const heap = new MinHeap<HeapItem>(compare ? (a, b) => compare(a.value, b.value) : undefined)
  const stream = new PassThrough({ objectMode: true })
  const ret = StreamTree.readable(stream)
  const deque = () => {
    if (heap.size < total - finished) return
    const item = heap.pop()!
    stream.write(options?.labelSource ? { source: item.source, value: item.value } : item.value)
    item.cb()
  }
  for (const [source, inputs] of entries) {
    for (const input of Array.isArray(inputs) ? inputs : [inputs]) {
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
            if (finished === total) stream.end()
            else deque()
          })
        )
        .piped(ret)
    }
  }
  return ret
}

interface HeapItem {
  source: string
  value: any
  cb: () => void
}
