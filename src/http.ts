import axios from 'axios'
import { PassThrough } from 'stream'
import StreamTree, { WritableStreamTree } from 'tree-stream'

import {
  AppendOptions,
  CreateOptions,
  EnsureDirectoryOptions,
  FileStatus,
  FileSystem,
  GetFileStatusOptions,
  OpenReadableFileOptions,
  OpenWritableFileOptions,
  ReadDirectoryOptions,
  ReplaceFileOptions,
} from './fs'
import { openNullReadable } from './stream'
import { zlib } from './util'

/**
 * HTTP [[FileSystem]] implemented with `axios`.
 */
export class HTTPFileSystem extends FileSystem {
  constructor(public options?: Record<string, any>) {
    super()
  }

  /** @inheritDoc */
  async readDirectory(_urlText: string, _options?: ReadDirectoryOptions) {
    return []
  }

  /** @inheritDoc */
  async readDirectoryStream(_urlText: string, _options?: ReadDirectoryOptions) {
    return openNullReadable()
  }

  /** @inheritDoc */
  async ensureDirectory(_urlText: string, _options?: EnsureDirectoryOptions) {
    return true
  }

  /** @inheritDoc */
  async removeDirectory(_urlText: string) {
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
  async getFileStatus(url: string, _options?: GetFileStatusOptions) {
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
  async openReadableFile(url: string, options?: OpenReadableFileOptions) {
    const headers = { 'Accept-Encoding': 'gzip', ...this.options?.headers }
    if (options?.byteLength != null) {
      const offset = options.byteOffset || 0
      headers.range = `bytes=${offset}-${offset + options.byteLength - 1}`
    }
    const res = await axios({
      ...this.options,
      url,
      method: 'get',
      headers,
      ...options?.extra,
      responseType: 'stream',
    })
    let stream = StreamTree.readable(res.data)
    if (res.headers['content-type'] === 'application/gzip' || url.endsWith('.gz')) {
      stream = stream.pipe(zlib.createGunzip())
    }
    return stream
  }

  /** @inheritDoc */
  async openWritableFile(url: string, options?: OpenWritableFileOptions) {
    const passThrough = new PassThrough()
    const headers = { ...this.options?.headers }
    if (options?.contentType) headers['Content-Type'] = options.contentType
    axios({ ...this.options, url, method: 'post', data: passThrough })
    let stream = StreamTree.writable(passThrough)
    if (url.endsWith('.gz')) stream = stream.pipeFrom(zlib.createGzip())
    return stream
  }

  /** @inheritDoc */
  async createFile(
    _urlText: string,
    _createCallback?: (stream: WritableStreamTree) => Promise<boolean>,
    _options?: CreateOptions
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
  async moveFile(_sourceUrlText: string, _destUrlText: string) {
    return false
  }

  /** @inheritDoc */
  async replaceFile(
    _urlText: string,
    _writeCallback: (stream: WritableStreamTree) => Promise<boolean>,
    _options?: ReplaceFileOptions
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
