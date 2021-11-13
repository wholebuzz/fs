import { DefaultAzureCredential } from '@azure/identity'
import { BlobServiceClient } from '@azure/storage-blob'
import { PassThrough, Readable } from 'stream'
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
 * Azure Blob Storage [[FileSystem]] implemented with `@azure/storage-blob`.
 */
export class AzureBlobStorageFileSystem extends FileSystem {
  blobServiceClient: BlobServiceClient

  constructor(public urlPrefix: string, public account: string) {
    super()
    const defaultAzureCredential = new DefaultAzureCredential()
    this.blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      defaultAzureCredential
    )
  }

  /**
   * Parse an `azure-blob://bucket/file/name.txt` URL into `bucket` and `file/name.txt`.
   * @param url The URL to parse.
   */
  parseUrl(url: string) {
    if (url.startsWith(this.urlPrefix)) url = url.substring(this.urlPrefix.length)
    const slash = url.indexOf('/')
    return {
      containerName: url.substring(0, slash),
      blobName: url.substring(slash + 1),
    }
  }

  /** @inheritDoc */
  async readDirectory(_urlText: string, _options?: ReadDirectoryOptions) {
    return []
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
  async fileExists(_url: string) {
    return true
  }

  /** @inheritDoc */
  async getFileStatus(url: string, _options?: GetFileStatusOptions) {
    return {
      url,
      modified: new Date(),
      inode: 0,
      size: 0,
      version: 0,
    }
  }

  /** @inheritDoc */
  async openReadableFile(urlText: string, _options: OpenReadableFileOptions) {
    const url = this.parseUrl(urlText)
    const containerClient = this.blobServiceClient.getContainerClient(url.containerName)
    const blobClient = await containerClient.getBlobClient(url.blobName)
    const downloadBlockBlobResponse = await blobClient.download()
    if (!downloadBlockBlobResponse.readableStreamBody) throw new Error('Open failed')
    const readable = new Readable()
    downloadBlockBlobResponse.readableStreamBody.wrap(readable)
    let stream = StreamTree.readable(readable)
    if (url.blobName.endsWith('.gz')) stream = stream.pipe(zlib.createGunzip())
    return stream
  }

  /** @inheritDoc */
  async openWritableFile(urlText: string, _options?: OpenWritableFileOptions) {
    const url = this.parseUrl(urlText)
    const containerClient = this.blobServiceClient.getContainerClient(url.containerName)
    const blobClient = await containerClient.getBlockBlobClient(url.blobName)
    const passThrough = new PassThrough()
    await blobClient.uploadStream(passThrough)
    let stream = StreamTree.writable(passThrough)
    if (url.blobName.endsWith('.gz')) stream = stream.pipeFrom(zlib.createGzip())
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
  async removeFile(_url: string) {
    return false
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
