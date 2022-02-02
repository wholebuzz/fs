import MinHeap from 'mnemonist/heap'
import { PassThrough, Transform } from 'stream'
import StreamTree, { ReadableStreamTree } from 'tree-stream'

export interface MergeStreamsOptions {
  combine?: (group: any[]) => any
  compare?: (a: Record<string, any>, b: Record<string, any>) => number
  group?: boolean
  labelSource?: boolean
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
  let currentGroup: any[] = []
  let unPauseCb: (() => void) | undefined
  const total = entries.reduce((pv, cv) => pv + (Array.isArray(cv[1]) ? cv[1].length : 1), 0)
  const compare = options?.compare
  const heap = new MinHeap<HeapItem>(compare ? (a, b) => compare(a.value, b.value) : undefined)
  const stream = new PassThrough({ objectMode: true })
  const getGroupItemValue = (x: any) => (options?.labelSource ? x.value : x)
  const ret = StreamTree.readable(stream)
  const deque = () => {
    while (!unPauseCb && heap.size >= total - finished && heap.size > 0) {
      const item = heap.pop()!
      const out = options?.labelSource ? { source: item.source, value: item.value } : item.value
      let paused = false
      if (compare && options?.group) {
        if (currentGroup.length > 0) {
          if (compare(item.value, getGroupItemValue(currentGroup[currentGroup.length - 1])) === 0) {
            currentGroup.push(out)
          } else {
            const wrote = stream.write(
              options?.combine ? options.combine(currentGroup) : currentGroup
            )
            if (!wrote) paused = true
            currentGroup = [out]
          }
        } else {
          currentGroup.push(out)
        }
      } else {
        const wrote = stream.write(out)
        if (!wrote) paused = true
      }
      if (paused) {
        unPauseCb = item.cb
      } else {
        item.cb()
      }
    }
  }
  stream.on('drain', () => {
    const cb = unPauseCb
    unPauseCb = undefined
    if (cb) cb()
    deque()
  })
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
            if (finished === total) {
              if (currentGroup.length > 0) {
                stream.write(options?.combine ? options.combine(currentGroup) : currentGroup)
              }
              stream.end()
            } else {
              deque()
            }
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
