import * as AWS from 'aws-sdk'
import s3stream from 's3-upload-stream'
import { Writable } from 'stream'
import StreamTree, { WritableStreamTree } from 'tree-stream'

import { AppendOptions, CreateOptions, FileStatus, FileSystem } from './fs'
import { logger, zlib } from './util'

/**
 * Amazon Web Services S3 [[FileSystem]] implemented with `aws-sdk` and `s3-upload-stream`.
 */
export class S3FileSystem extends FileSystem {
  s3: AWS.S3
  uploader

  /**
   * The SDK automatically detects AWS credentials set as variables in your
   * environment and uses them for SDK requests, eliminating the need to manage
   * credentials in your application. The environment variables that you set to
   * provide your credentials are:
   * AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN
   * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html
   */
  constructor() {
    super()
    this.s3 = new AWS.S3()
    this.uploader = s3stream(this.s3)
  }

  /**
   * Parse a `s3://bucket/file/name.txt` URL into `bucket` and `file/name.txt`.
   * @param url The URL to parse.
   */
  parseUrl(url: string) {
    if (url.startsWith('s3://')) url = url.substring(5)
    const slash = url.indexOf('/')
    return {
      Bucket: url.substring(0, slash),
      Key: url.substring(slash + 1),
    }
  }

  /** @inheritDoc */
  async readDirectory(urlText: string, prefix?: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const ret: string[] = []
      const url = this.parseUrl(urlText)
      this.s3.listObjectsV2(
        { Bucket: url.Bucket, Prefix: prefix },
        (err: AWS.AWSError, data: AWS.S3.Types.ListObjectsOutput) => {
          if (err) {
            reject(err)
          } else {
            data.Contents?.forEach((x) => {
              if (x.Key) ret.push(x.Key)
            })
            resolve(ret)
          }
        }
      )
    })
  }

  /** @inheritDoc */
  async ensureDirectory(_urlText: string, _mask?: number) {
    return true
  }

  /** @inheritDoc */
  async fileExists(urlText: string) {
    const url = this.parseUrl(urlText)
    return this.s3
      .headObject(url)
      .promise()
      .then(
        (_res: AWS.S3.Types.HeadObjectOutput) => true,
        (err: AWS.AWSError) => {
          if (err.code === 'NotFound') {
            return false
          }
          throw err
        }
      )
  }

  /** @inheritDoc */
  async getFileStatus(urlText: string, _getVersion = true) {
    const url = this.parseUrl(urlText)
    const status = await this.s3.headObject(url).promise()
    return {
      inode: 0,
      url: urlText,
      modified: status.LastModified ?? new Date(0),
      size: status.ContentLength ?? 0,
      version: status.ETag ?? '',
    }
  }

  /** @inheritDoc */
  async openReadableFile(urlText: string, version?: number | string) {
    const gzipped = urlText.endsWith('.gz')
    const url = { ...this.parseUrl(urlText), IfMatch: version?.toString() }
    let stream = StreamTree.readable(this.s3.getObject(url).createReadStream())
    if (gzipped) stream = stream.pipe(zlib.createGunzip())
    return stream
  }

  /** @inheritDoc */
  async openWritableFile(urlText: string, version?: number | string, _options?: CreateOptions) {
    const url = { ...this.parseUrl(urlText), Version: version }
    let stream = StreamTree.writable(this.uploader.upload(url))
    if (urlText.endsWith('.gz')) {
      stream = stream.pipeFrom(zlib.createGzip())
    }
    return stream
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
  async removeFile(urlText: string) {
    const url = this.parseUrl(urlText)
    let deleted = false
    try {
      await this.s3.deleteObject(url).promise()
      deleted = true
    } catch (err) {
      logger.error(`Error while deleting file from s3`, { error: err })
    }
    return deleted
  }

  /** @inheritDoc */
  async queueRemoveFile(_urlText: string) {
    return false
  }

  /** @inheritDoc */
  async copyFile(sourceUrlText: string, destUrlText: string) {
    const sourceUrl = this.parseUrl(sourceUrlText)
    const destUrl = this.parseUrl(destUrlText)
    await this.s3
      .copyObject({
        ...destUrl,
        CopySource: sourceUrl.Bucket + '/' + sourceUrl.Key,
      })
      .promise()
    return true
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
