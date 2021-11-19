import * as readline from 'readline'
import StreamTree, { finishReadable, finishWritable, ReadableStreamTree } from 'tree-stream'
import { FileStatus, FileSystem } from './fs'

/**
 * Reads every line from a file.
 * @param url The URL of the file to read lines from.
 * @param map Callback called for each line.
 */
export async function readLines<X>(
  fileSystem: FileSystem,
  url: string,
  map: (x: string) => X
): Promise<X[]> {
  return mapLines(await fileSystem.openReadableFile(url), map)
}

/**
 * Reads every line from a file, treating the first line as a header.
 * @param url The URL of the file to read lines from.
 * @param map Callback called for every line succeeding the header.
 * @param header Callback called for the first line.
 */
export async function readLinesWithHeader<X, H>(
  fileSystem: FileSystem,
  url: string,
  map: (x: string) => X,
  header?: (x: string) => H,
  ret: X[] = []
): Promise<[H | undefined, X[]]> {
  return mapLinesWithHeader(await fileSystem.openReadableFile(url), map, header, ret)
}

export async function parseLines(
  stream: ReadableStreamTree,
  callback: (x: string) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const input = readline.createInterface({
      input: finishReadable(stream, resolve, reject),
    })
    input.on('line', callback)
  })
}

/**
 * Maps lines from [[stream]].  Used to implement [[readLines]].
 * @param stream The stream to read lines from.
 */
export async function mapLines<X>(stream: ReadableStreamTree, map: (x: string) => X): Promise<X[]> {
  const ret: X[] = []
  await parseLines(stream, (line) => ret.push(map(line)))
  return ret
}

/**
 * Parses lines (with header) from [[stream]].  Used to implement [[readLinesWithHeader]].
 * @param stream The stream to read lines from.
 */
export async function mapLinesWithHeader<X, H>(
  stream: ReadableStreamTree,
  map: (x: string) => X,
  header?: (y: string) => H,
  ret: X[] = []
): Promise<[H | undefined, X[]]> {
  return new Promise((resolve, reject) => {
    let hdr: H | undefined
    const input = readline.createInterface({
      input: stream.finish((err) => {
        if (err) reject(err)
        else resolve([hdr, ret])
      }),
    })
    input.on('line', (line) => {
      if (header && !hdr) hdr = header(line)
      else {
        const mapped = map(line)
        ret?.push(mapped)
      }
    })
  })
}

/**
 * Appends a line of text to a file.
 * @param url The URL of the file to append a line to.
 */
export async function appendLine(
  fileSystem: FileSystem,
  urlText: string,
  line: string
): Promise<FileStatus | null> {
  return fileSystem.appendToFile(
    urlText,
    StreamTree.writer(async (stream) => {
      stream.write(line + '\n')
      stream.end()
    })
  )
}

/**
 * Writes the string to a file.
 * @param url The URL of the file to serialize the string to.
 * @param value The string to serialize.
 */
export async function writeContent(fileSystem: FileSystem, url: string, value: string) {
  const stream = await fileSystem.openWritableFile(url)
  return new Promise<void>((resolve, reject) => {
    const out = finishWritable(stream, resolve, reject)
    out.write(value)
    out.end()
  })
}
