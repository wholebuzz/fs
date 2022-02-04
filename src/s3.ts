import { AthenaExpress } from 'athena-express'
import * as AWS from 'aws-sdk'
import { PassThrough } from 'stream'
import StreamTree, { ReadableStreamTree, WritableStreamTree } from 'tree-stream'
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

const UploadStream = require('s3-stream-upload')

/**
 * Amazon Web Services S3 [[FileSystem]] implemented with `aws-sdk` and `s3-stream-upload`.
 */
export class S3FileSystem extends FileSystem {
  s3: AWS.S3
  athenaExpress: AthenaExpress<Record<string, any>> | undefined

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

  formatDirectoryContents(
    url: { Bucket: string; Key: string },
    x: AWS.S3.Types.Object
  ): DirectoryEntry {
    return {
      url: `s3://${url.Bucket}/${x.Key}`,
      modified: x.LastModified,
      size: x.Size,
    }
  }

  /** @inheritDoc */
  async readDirectory(urlText: string, options?: ReadDirectoryOptions): Promise<DirectoryEntry[]> {
    return new Promise((resolve, reject) => {
      const ret: DirectoryEntry[] = []
      const url = this.parseUrl(urlText)
      this.s3.listObjectsV2(
        { Bucket: url.Bucket, Prefix: options?.prefix },
        (err: AWS.AWSError, data: AWS.S3.Types.ListObjectsOutput) => {
          if (err) {
            reject(err)
          } else {
            data.Contents?.forEach((x) => {
              if (x.Key) ret.push(this.formatDirectoryContents(url, x))
            })
            resolve(ret)
          }
        }
      )
    })
  }

  /** @inheritDoc */
  async readDirectoryStream(
    urlText: string,
    options?: ReadDirectoryOptions
  ): Promise<ReadableStreamTree> {
    const url = this.parseUrl(urlText)
    const passThrough = new PassThrough()
    const listObjects = (target: AWS.S3.Types.ListObjectsRequest) => {
      this.s3.listObjectsV2(target, (err: AWS.AWSError, data: AWS.S3.Types.ListObjectsOutput) => {
        if (err) {
          passThrough.destroy(err)
        } else {
          data.Contents?.forEach((x) => {
            if (x.Key) passThrough.push(this.formatDirectoryContents(url, x))
          })
          if (data.IsTruncated) {
            listObjects({ ...target, Marker: data.NextMarker })
          } else {
            passThrough.push(null)
          }
        }
      })
    }
    listObjects({ Bucket: url.Bucket, Prefix: options?.prefix })
    return StreamTree.readable(passThrough)
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

  /**
   * @inheritDoc
   * Opens a readable stream to an S3 Bucket's Key.
   * The special URL `s3://athena.csv` sends `options.query` to AWS Athena and returns CSV data.
   * Otherwise `options.query` runs an S3 Select on the Key.
   */
  async openReadableFile(urlText: string, options?: OpenReadableFileOptions) {
    const gzipped = urlText.endsWith('.gz')
    if (options?.query) {
      if (urlText === 's3://athena.csv') {
        if (!this.athenaExpress) {
          this.athenaExpress = new AthenaExpress<Record<string, any>>({
            aws: AWS,
            skipResults: true,
            ...options.extra,
          })
        }
        const results = await this.athenaExpress.query(options?.query)
        if (options.extra && options.extraOutput) options.extra.results = results
        const resultsUrl = this.parseUrl(results.S3Location ?? '')
        return StreamTree.readable(this.s3.getObject(resultsUrl).createReadStream())
      }
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
      const passThrough = new PassThrough()
      const ret = StreamTree.readable(passThrough)
      this.s3.selectObjectContent(url, (error, data) => {
        if (error || !data || !data.Payload) {
          passThrough.destroy(error)
        } else {
          // XXX events has no pause() or resume()
          const events = data.Payload as any
          events
            .on('data', (event: any) => {
              if (event.Records) {
                /// XXX no backpressure is possible
                passThrough.push(event.Records.Payload)
              } else if (event.Stats) {
                // console.log(`selectObjectContent.Stats`, event.Stats)
              }
            })
            .on('error', (err: Error) => passThrough.destroy(err))
            .on('end', () => passThrough.push(null))
        }
      })
      return ret
    } else {
      const url = {
        ...this.parseUrl(urlText),
        IfMatch: options?.version?.toString(),
        Range:
          options?.byteOffset != null && options.byteLength != null
            ? `bytes=${options.byteOffset}-${options.byteOffset + options.byteLength - 1}`
            : undefined,
        ...options?.extra,
      }
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
