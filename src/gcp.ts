import { Storage as CloudStorage } from '@google-cloud/storage'
import { Transform, Writable } from 'stream'
import StreamTree, { ReadableStreamTree, WritableStreamTree } from 'tree-stream'
import { v4 as uuidv4 } from 'uuid'

import {
  AppendOptions,
  CreateOptions,
  DirectoryEntry,
  EnsureDirectoryOptions,
  FileStatus,
  FileSystem,
  GetFileStatusOptions,
  OpenReadableFileOptions,
  OpenWritableFileOptions,
  ReadDirectoryOptions,
  ReplaceFileOptions,
} from './fs'
import { logger, zlib } from './util'

/**
 * Google Cloud Storage [[FileSystem]] implemented with `@google-cloud/storage`.
 */
export class GoogleCloudFileSystem extends FileSystem {
  storage: CloudStorage

  /**
   * By default, the client will authenticate using the service account file
   * specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
   * the project specified by the GCLOUD_PROJECT environment variable. See
   * https://cloud.google.com/docs/authentication/production#providing_credentials_to_your_application
   */
  constructor() {
    super()
    this.storage = new CloudStorage()
  }

  /**
   * Parse a `gs://bucket/file/name.txt` URL into `bucket` and `file/name.txt`.
   * @param url The URL to parse.
   */
  parseUrl(url: string) {
    if (url.startsWith('gs://')) url = url.substring(5)
    const slash = url.indexOf('/')
    return {
      bucket: url.substring(0, slash),
      filename: url.substring(slash + 1),
    }
  }

  getBucket(urlText: string) {
    const url = this.parseUrl(urlText)
    return this.storage.bucket(url.bucket)
  }

  getFile(urlText: string, version?: string | number) {
    const url = this.parseUrl(urlText)
    const bucket = this.storage.bucket(url.bucket)
    return bucket.file(url.filename, version ? { generation: version } : undefined)
  }

  /** @inheritDoc */
  async readDirectory(urlText: string, options?: ReadDirectoryOptions): Promise<DirectoryEntry[]> {
    return new Promise((resolve, reject) => {
      const ret: DirectoryEntry[] = []
      const bucket = this.getBucket(urlText)
      bucket
        .getFilesStream({ prefix: options?.prefix })
        .on('error', reject)
        .on('data', (f: any) => ret.push({ url: `gs://${bucket.name}/${f.name}` }))
        .on('end', () => resolve(ret))
    })
  }

  /** @inheritDoc */
  async readDirectoryStream(
    urlText: string,
    options?: ReadDirectoryOptions
  ): Promise<ReadableStreamTree> {
    const bucket = this.getBucket(urlText)
    const stream = StreamTree.readable(bucket.getFilesStream({ prefix: options?.prefix }))
    return stream.pipe(
      new Transform({
        objectMode: true,
        transform(data, _, callback) {
          this.push({ url: `gs://${bucket.name}/${data}` })
          callback()
        },
      })
    )
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
  async fileExists(urlText: string) {
    const file = this.getFile(urlText)
    const exists = (await file.exists())[0]
    return exists
  }

  /** @inheritDoc */
  async getFileStatus(urlText: string, _options?: GetFileStatusOptions) {
    const file = this.getFile(urlText)
    const metadata = await file.getMetadata()
    return {
      inode: 0,
      url: urlText,
      modified: metadata[0].updated,
      size: metadata[0].size,
      version: metadata[0].generation,
    }
  }

  /** @inheritDoc */
  async openReadableFile(url: string, options?: OpenReadableFileOptions) {
    const gzipped = url.endsWith('.gz')
    let stream = StreamTree.readable(
      this.getFile(url, options?.version).createReadStream({
        decompress: gzipped ? false : undefined,
        start: options?.byteOffset,
        end: options?.byteLength ? (options.byteOffset ?? 0) + options.byteLength - 1 : undefined,
      })
    )
    if (gzipped) stream = stream.pipe(zlib.createGunzip())
    return stream
  }

  /** @inheritDoc */
  async openWritableFile(url: string, options?: OpenWritableFileOptions) {
    let stream = StreamTree.writable(this.getFile(url, options?.version).createWriteStream(options))
    if (url.endsWith('.gz')) stream = stream.pipeFrom(zlib.createGzip())
    return stream
  }

  /** @inheritDoc */
  async createFile(
    urlText: string,
    createCallback = StreamTree.writer(async (stream: Writable) => {
      stream.end()
    }),
    options?: CreateOptions
  ) {
    try {
      const initialVersion = 0
      return await createCallback(
        StreamTree.writable(this.getFile(urlText, initialVersion).createWriteStream(options))
      )
    } catch (err) {
      if (options?.debug) logger.debug('createFile', err)
      return false
    }
  }

  /** @inheritDoc */
  async removeFile(urlText: string) {
    await this.getFile(urlText).delete()
    return true
  }

  /** @inheritDoc */
  async queueRemoveFile(urlText: string) {
    await this.getFile(urlText).setMetadata({ 'Custom-Time': new Date().toISOString() })
    return true
  }

  /** @inheritDoc */
  async copyFile(sourceUrlText: string, destUrlText: string) {
    const sourceFile = this.getFile(sourceUrlText)
    const destFile = this.getFile(destUrlText)
    await sourceFile.copy(destFile)
    return true
  }

  /** @inheritDoc */
  async moveFile(_sourceUrlText: string, _destUrlText: string) {
    return false
  }

  /** @inheritDoc */
  async replaceFile(
    urlText: string,
    writeCallback: (stream: WritableStreamTree) => Promise<boolean>,
    options?: ReplaceFileOptions
  ): Promise<boolean> {
    try {
      if (options?.version === 0 || (!options?.version && !(await this.fileExists(urlText)))) {
        const created = await this.createFile(urlText, writeCallback, options)
        if (created) return true
        if (options?.version === 0) return false
      }
      const replacedFile = this.getFile(urlText, options?.version)
      return await writeCallback(StreamTree.writable(replacedFile.createWriteStream(options)))
    } catch (err) {
      if (options?.debug) logger.debug('replaceGS', err)
      return false
    }
  }

  /** @inheritDoc */
  async appendToFile(
    urlText: string,
    writeCallback: (stream: WritableStreamTree) => Promise<boolean>,
    createCallback?: (stream: WritableStreamTree) => Promise<boolean>,
    createOptions?: CreateOptions,
    appendOptions?: AppendOptions
  ): Promise<FileStatus | null> {
    if (
      appendOptions?.version === 0 ||
      (!appendOptions?.version && !(await this.fileExists(urlText)))
    ) {
      const created = await this.createFile(urlText, createCallback, createOptions)
      if (created) return this.getFileStatus(urlText)
      if (appendOptions?.version === 0) return null
    }

    const bucket = this.getBucket(urlText)
    const tempFile = bucket.file(uuidv4())
    const appendFile = this.getFile(urlText, appendOptions?.version)
    const appended = await writeCallback(
      StreamTree.writable(tempFile.createWriteStream(createOptions))
    )
    if (!appended) return null

    const combineResponse = await bucket.combine([appendFile, tempFile], appendFile)
    await tempFile.delete()
    return {
      inode: 0,
      url: urlText,
      modified: combineResponse[1].updated,
      size: combineResponse[1].size,
      version: combineResponse[1].generation,
    }
  }
}
