import SMB2 from '@marsaud/smb2'
import { Readable } from 'stream'
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
import { zlib } from './util'

/**
 * SMB [[FileSystem]] implemented with `@marsaud/smb2`.
 */
export class SMBFileSystem extends FileSystem {
  smb2: SMB2

  constructor(
    public urlPrefix: string,
    options: {
      share: string
      username: string
      domain: string
      password: string
      port?: number
    }
  ) {
    super()
    this.smb2 = new SMB2(options)
  }

  parseUrl(url: string) {
    if (url.startsWith(this.urlPrefix)) url = url.substring(this.urlPrefix.length)
    return url
  }

  /** @inheritDoc */
  async readDirectory(url: string, _options?: ReadDirectoryOptions) {
    return (await this.smb2.readdir(this.parseUrl(url))).map((x) => ({ url: x }))
  }

  /** @inheritDoc */
  async readDirectoryStream(url: string, options?: ReadDirectoryOptions) {
    return StreamTree.readable(Readable.from(await this.readDirectory(url, options)))
  }

  /** @inheritDoc */
  async ensureDirectory(url: string, options?: EnsureDirectoryOptions) {
    await this.smb2.mkdir(this.parseUrl(url), options?.mask)
    return true
  }

  /** @inheritDoc */
  async removeDirectory(url: string) {
    await this.smb2.rmdir(this.parseUrl(url))
    return true
  }

  /** @inheritDoc */
  async fileExists(url: string) {
    try {
      await this.smb2.stat(this.parseUrl(url))
      return true
    } catch {
      return false
    }
  }

  /** @inheritDoc */
  async getFileStatus(url: string, _options?: GetFileStatusOptions) {
    const res = await this.smb2.stat(this.parseUrl(url))
    return {
      url,
      modified: res.mtime,
      inode: 0,
      size: 0,
      version: 0,
    }
  }

  /** @inheritDoc */
  async openReadableFile(url: string, options?: OpenReadableFileOptions) {
    const gzipped = url.endsWith('.gz')
    let stream = StreamTree.readable(
      await this.smb2.createReadStream(this.parseUrl(url), {
        start: options?.byteOffset,
        end: options?.byteLength ? (options?.byteOffset ?? 0) + options.byteLength - 1 : undefined,
      })
    )
    if (gzipped) stream = stream.pipe(zlib.createGunzip())
    return stream
  }

  /** @inheritDoc */
  async openWritableFile(url: string, _options?: OpenWritableFileOptions) {
    let stream = StreamTree.writable(await this.smb2.createWriteStream(this.parseUrl(url)))
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
    await this.smb2.unlink(this.parseUrl(url))
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
  async moveFile(sourceUrlText: string, destUrlText: string) {
    await this.smb2.rename(this.parseUrl(sourceUrlText), this.parseUrl(destUrlText))
    return true
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
