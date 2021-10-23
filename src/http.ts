import axios from 'axios'
import { PassThrough, Writable } from 'stream'
import StreamTree, { WritableStreamTree } from 'tree-stream'

import { AppendOptions, CreateOptions, FileStatus, FileSystem } from './fs'
import { zlib } from './util'

/**
 * HTTP [[FileSystem]] implemented with `axios`.
 */
export class HTTPFileSystem extends FileSystem {
  constructor(public options?: Record<string, any>) {
    super()
  }

  /** @inheritDoc */
  async readDirectory(_urlText: string, _prefix?: string): Promise<string[]> {
    return []
  }

  /** @inheritDoc */
  async ensureDirectory(_urlText: string, _mask?: number) {
    return true
  }

  /** @inheritDoc */
  async fileExists(url: string) {
    try {
      await axios({ ...this.options, url, method: 'head' })
    } catch {
      return false
    }
    return true
  }

  /** @inheritDoc */
  async getFileStatus(url: string, _getVersion = true) {
    const res = await axios({ ...this.options, url, method: 'head' })
    return {
      url,
      modified: new Date(res.headers['last-modified']),
      inode: 0,
      size: res.headers['content-length'] ?? 0,
      version: 0,
    }
  }

  /** @inheritDoc */
  async openReadableFile(url: string, _version?: number | string) {
    const headers = { 'Accept-Encoding': 'gzip', ...this.options?.headers }
    const res = await axios({
      ...this.options,
      url,
      method: 'get',
      headers,
      responseType: 'stream',
    })
    let stream = StreamTree.readable(res.data)
    if (res.headers['content-type'] === 'application/gzip') {
      stream = stream.pipe(zlib.createGunzip())
    }
    return stream
  }

  /** @inheritDoc */
  async openWritableFile(url: string, _version?: number | string, options?: CreateOptions) {
    const stream = new PassThrough()
    const headers = { ...this.options?.headers }
    if (options?.contentType) headers['Content-Type'] = options.contentType
    axios({ ...this.options, url, method: 'post', data: stream })
    return StreamTree.writable(stream)
  }

  /** @inheritDoc */
  async createFile(
    _urlText: string,
    _createCallback = StreamTree.writer(async (stream: Writable) => {
      stream.end()
    }),
    _createOptions?: CreateOptions
  ) {
    return false
  }

  /** @inheritDoc */
  async removeFile(url: string) {
    try {
      await axios({ ...this.options, url, method: 'delete' })
    } catch {
      return false
    }
    return true
  }

  /** @inheritDoc */
  async queueRemoveFile(_urlText: string) {
    return false
  }

  /** @inheritDoc */
  async copyFile(_sourceUrlText: string, _destUrlText: string) {
    return false
  }

  /** @inheritDoc */
  async replaceFile(
    _urlText: string,
    _writeCallback: (stream: WritableStreamTree) => Promise<boolean>,
    _createOptions?: CreateOptions,
    _version?: string | number
  ): Promise<boolean> {
    return false
  }

  /** @inheritDoc */
  async appendToFile(
    _urlText: string,
    _writeCallback: (stream: WritableStreamTree) => Promise<boolean>,
    _createCallback?: (stream: WritableStreamTree) => Promise<boolean>,
    _createOptions?: CreateOptions,
    _appendOptions?: AppendOptions
  ): Promise<FileStatus | null> {
    return null
  }
}
