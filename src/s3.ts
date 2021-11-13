import * as AWS from 'aws-sdk'
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
import { logger, zlib } from './util'

const UploadStream = require('s3-stream-upload')

/**
 * Amazon Web Services S3 [[FileSystem]] implemented with `aws-sdk` and `s3-stream-upload`.
 */
export class S3FileSystem extends FileSystem {
  s3: AWS.S3

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
  async readDirectory(urlText: string, options?: ReadDirectoryOptions): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const ret: string[] = []
      const url = this.parseUrl(urlText)
      this.s3.listObjectsV2(
        { Bucket: url.Bucket, Prefix: options?.prefix },
        (err: AWS.AWSError, data: AWS.S3.Types.ListObjectsOutput) => {
          if (err) {
            reject(err)
          } else {
            data.Contents?.forEach((x) => {
              if (x.Key) ret.push(`s3://${url.Bucket}/${x.Key}`)
            })
            resolve(ret)
          }
        }
      )
    })
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
  async getFileStatus(urlText: string, _options?: GetFileStatusOptions) {
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
  async openReadableFile(urlText: string, options?: OpenReadableFileOptions) {
    const gzipped = urlText.endsWith('.gz')
    if (options?.query) {
      const formatSuffix = gzipped ? urlText.substring(0, urlText.length - 3) : urlText
      const inputSerialization: Record<string, any> = {
        CompressionType: gzipped ? 'GZIP' : 'NONE',
      }
      let isJson = false
      if (formatSuffix.endsWith('.csv')) {
        inputSerialization.CSV = {}
      } else if (formatSuffix.endsWith('.parquet')) {
        inputSerialization.Parquet = {}
      } else if (formatSuffix.endsWith('.jsonl') || formatSuffix.endsWith('.ndjson')) {
        inputSerialization.JSON = {
          Type: 'LINES',
        }
      } else {
        inputSerialization.JSON = {
          Type: 'DOCUMENT',
        }
        isJson = true
      }
      const url = {
        ...this.parseUrl(urlText),
        Expression: options.query,
        ExpressionType: 'SQL',
        InputSerialization: inputSerialization,
        OutputSerialization: options.extra?.OutputSerialization ?? {
          JSON: {
            RecordDelimiter: isJson ? ',' : '\n',
          },
        },
        ...options.extra,
      }
      return StreamTree.readable(this.s3.selectObjectContent(url).createReadStream())
    } else {
      const url = { ...this.parseUrl(urlText), IfMatch: options?.version?.toString() }
      let stream = StreamTree.readable(this.s3.getObject(url).createReadStream())
      if (gzipped) stream = stream.pipe(zlib.createGunzip())
      return stream
    }
  }

  /** @inheritDoc */
  async openWritableFile(urlText: string, options?: OpenWritableFileOptions) {
    const url = { ...this.parseUrl(urlText), Version: options?.version }
    let stream = StreamTree.writable(UploadStream(this.s3, url))
    if (urlText.endsWith('.gz')) {
      stream = stream.pipeFrom(zlib.createGzip())
    }
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
