import * as fs from 'fs'
import { constants as fsConstants, flock, seek } from 'fs-ext'
import * as path from 'path'
import { Writable } from 'stream'
import StreamTree, { ReadableStreamTree, WritableStreamTree } from 'tree-stream'
import { promisify } from 'util'
import { hashStream, logger, zlib } from './util'

const fsAccess = promisify(fs.access)
const fsCopyFile = promisify(fs.copyFile)
const fsClose = promisify(fs.close)
const fsFlock = (fd: number, flags: 'sh' | 'ex' | 'shnb' | 'exnb' | 'un') =>
  new Promise((resolve, _) => flock(fd, flags, (err) => resolve(err)))
const fsFstat = promisify(fs.fstat)
const fsFtruncate = promisify(fs.ftruncate)
const fsOpen = promisify(fs.open)
const fsReaddir = promisify(fs.readdir)
const fsSeek = promisify(seek)
const fsStat = promisify(fs.stat)
const fsUnlink = promisify(fs.unlink)

/**
 * File status like `struct stat` with added versioning.
 */
export interface FileStatus {
  url: string

  /** The file last modified */
  modified: Date

  /** The file size */
  size: number

  /** The file inode */
  inode: number

  /** Content hash for local file, and `metadata.generation` for GCP */
  version: string | number
}

/**
 * Options for creating a file.
 */
export interface CreateOptions {
  contentType?: string
  gzip?: boolean | string
  debug?: boolean
}

/**
 * Options when appending to a file.
 */
export interface AppendOptions {
  returnVersion?: boolean
  version?: string | number
}

/**
 * File system interface for atomic primitives enabling multiple readers and writers.
 */
export abstract class FileSystem {
  /**
   * Returns the URLs of the files in a directory.
   * @param urlText The URL of the directory to list files in.
   */
  abstract readDirectory(urlText: string, prefix?: string): Promise<string[]>

  /**
   * Ensures the directory exists
   * @param urlText The URL of the directory.
   */
  abstract ensureDirectory(urlText: string, mask?: number): Promise<boolean>

  /**
   * Returns `true` if the file exists.
   * @param urlText The URL of the file to check whether exists.
   */
  abstract fileExists(urlText: string): Promise<boolean>

  /**
   * Determines the file status. The file version is used to implement atomic mutations.
   * @param urlText The URL of the file to retrieve the status for.
   */
  abstract getFileStatus(urlText: string, getVersion?: boolean): Promise<FileStatus>

  /**
   * Opens a file for reading.
   * @param url The URL of the file to read from.
   * @optional version Fails if version doesn't match for GCS URLs.
   */
  abstract openReadableFile(url: string, version?: number | string): Promise<ReadableStreamTree>

  /**
   * Opens a file for writing.
   * @param url The URL of the file to write to.
   * @optional version Fails if version doesn't match for GCS URLs.
   */
  abstract openWritableFile(
    url: string,
    version?: number | string,
    options?: CreateOptions
  ): Promise<WritableStreamTree>

  /**
   * Creates file, failing if the file already exists.
   * @param urlText The URL of the file to create.
   * @param createCallback Stream callback for initializing the file.
   * @param createOptions Initial metadata.
   */
  abstract createFile(
    urlText: string,
    createCallback?: (stream: WritableStreamTree) => Promise<boolean>,
    createOptions?: CreateOptions
  ): Promise<boolean>

  /**
   * Deletes the file.
   * @param urlText The URL of the file to remove.
   */
  abstract removeFile(urlText: string): Promise<boolean>

  /**
   * Queues deletion, e.g. after DaysSinceCustomTime.
   * @param urlText The URL of the file to remove.
   */
  abstract queueRemoveFile(urlText: string): Promise<boolean>

  /**
   * Copies the file.
   * @param sourceUrlText The URL of the source file to copy.
   * @param destUrlText The destination URL to copy the file to.
   */
  abstract copyFile(sourceUrlText: string, destUrlText: string): Promise<boolean>

  /**
   * Replaces the file, failing if the file version doesn't match.
   * @param urlText The URL of the file to replace.
   * @param writeCallback Stream callback for replacing the file.
   * @param createOptions Initial metadata for replaced file.
   * @param version The version of the file to replace.
   */
  abstract replaceFile(
    urlText: string,
    writeCallback: (stream: WritableStreamTree) => Promise<boolean>,
    createOptions?: CreateOptions,
    version?: string | number
  ): Promise<boolean>

  /**
   * Appends to the file, safely.  Either `writeCallback` or `createCallback` is called.
   * For simple appends, the same paramter can be supplied for both `writeCallback` and
   * `createCallback`.
   * @param urlText The URL of the file to append to.
   * @param writeCallback Stream callback for appending to the file.
   * @param createCallback Stream callback for initializing the file, if necessary.
   * @param createOptions Initial metadata for initializing the file, if necessary.
   */
  abstract appendToFile(
    urlText: string,
    writeCallback: (stream: WritableStreamTree) => Promise<boolean>,
    createCallback?: (stream: WritableStreamTree) => Promise<boolean>,
    createOptions?: CreateOptions,
    appendOptions?: AppendOptions
  ): Promise<FileStatus | null>
}

/**
 * Class Adapter Pattern wrapping [[FileSystem]] by `urlPrefix`.
 */
export class AnyFileSystem extends FileSystem {
  /**
   * Construct an [[AnyFileSystem]] wrapping the provided [[FileSystem]].
   * @param supported The [[FileSystem]] to delegate according to `urlPrefix`.
   */
  constructor(public supported: Array<{ urlPrefix: string; fs: FileSystem }>) {
    super()
  }

  /**
   * Returns the [[FileSystem]] provider for `url`.
   * @param url The URL of the file.
   */
  getFs(url: string): FileSystem {
    for (const impl of this.supported) if (url.startsWith(impl.urlPrefix)) return impl.fs
    throw new Error(`No filesystem found for: ${url}`)
  }

  /** @inheritDoc */
  async readDirectory(urlText: string, prefix?: string) {
    return this.getFs(urlText).readDirectory(urlText, prefix)
  }

  /** @inheritDoc */
  async ensureDirectory(urlText: string) {
    return this.getFs(urlText).ensureDirectory(urlText)
  }

  /** @inheritDoc */
  async fileExists(urlText: string) {
    return this.getFs(urlText).fileExists(urlText)
  }

  /** @inheritDoc */
  async getFileStatus(urlText: string, getVersion = true) {
    return this.getFs(urlText).getFileStatus(urlText, getVersion)
  }

  /** @inheritDoc */
  async openReadableFile(url: string, version?: number | string) {
    return this.getFs(url).openReadableFile(url, version)
  }

  /** @inheritDoc */
  async openWritableFile(url: string, version?: number | string, options?: CreateOptions) {
    return this.getFs(url).openWritableFile(url, version, options)
  }

  /** @inheritDoc */
  async createFile(
    urlText: string,
    createCallback?: (stream: WritableStreamTree) => Promise<boolean>,
    createOptions?: CreateOptions
  ) {
    return this.getFs(urlText).createFile(urlText, createCallback, createOptions)
  }

  /** @inheritDoc */
  async removeFile(urlText: string) {
    return this.getFs(urlText).removeFile(urlText)
  }

  /** @inheritDoc */
  async queueRemoveFile(urlText: string) {
    return this.getFs(urlText).queueRemoveFile(urlText)
  }

  /** @inheritDoc */
  async copyFile(sourceUrlText: string, destUrlText: string) {
    return this.getFs(destUrlText).copyFile(sourceUrlText, destUrlText)
  }

  /** @inheritDoc */
  async replaceFile(
    urlText: string,
    writeCallback: (stream: WritableStreamTree) => Promise<boolean>,
    createOptions?: CreateOptions,
    version?: string | number
  ): Promise<boolean> {
    return this.getFs(urlText).replaceFile(urlText, writeCallback, createOptions, version)
  }

  /** @inheritDoc */
  async appendToFile(
    urlText: string,
    writeCallback: (stream: WritableStreamTree) => Promise<boolean>,
    createCallback?: (stream: WritableStreamTree) => Promise<boolean>,
    createOptions?: CreateOptions,
    appendOptions?: AppendOptions
  ): Promise<FileStatus | null> {
    return this.getFs(urlText).appendToFile(
      urlText,
      writeCallback,
      createCallback,
      createOptions,
      appendOptions
    )
  }
}

/**
 * Local [[FileSystem]] implemented with `fs` and `fs-ext`.
 */
export class LocalFileSystem extends FileSystem {
  /** @inheritDoc */
  async readDirectory(urlText: string, prefix?: string) {
    let files = await fsReaddir(urlText)
    if (prefix) files = files.filter((x) => x.startsWith(prefix))
    return files.map((x) => path.join(urlText, x))
  }

  /** @inheritDoc */
  async ensureDirectory(urlText: string, mask = 0o755) {
    return new Promise<boolean>((resolve, reject) => {
      fs.mkdir(urlText, mask, (err) => {
        if (err) {
          if (err.code === 'EEXIST') resolve(true)
          else reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }

  /** @inheritDoc */
  async fileExists(urlText: string) {
    try {
      await fsAccess(urlText)
      return true
    } catch (_) {
      return false
    }
  }

  /** @inheritDoc */
  async getFileStatus(urlText: string, getVersion = true) {
    const version = (getVersion && (await hashStream(fs.createReadStream(urlText)))) || ''
    const stat = await fsStat(urlText)
    return {
      url: urlText,
      modified: stat.mtime,
      size: stat.size,
      inode: stat.ino,
      version,
    }
  }

  /** @inheritDoc */
  async openReadableFile(url: string, _?: number | string) {
    let stream = StreamTree.readable(fs.createReadStream(url))
    if (url.endsWith('.gz')) stream = stream.pipe(zlib.createGunzip())
    return stream
  }

  /** @inheritDoc */
  async openWritableFile(url: string, _?: number | string, __?: CreateOptions) {
    let stream = StreamTree.writable(fs.createWriteStream(url))
    if (url.endsWith('.gz')) stream = stream.pipeFrom(zlib.createGzip())
    return stream
  }

  /** @inheritDoc */
  async createFile(
    urlText: string,
    createCallback = StreamTree.writer(async (stream: Writable) => {
      stream.end()
    }),
    createOptions?: CreateOptions
  ) {
    try {
      return await createCallback(
        StreamTree.writable(fs.createWriteStream(urlText, { flags: 'ax' }))
      )
    } catch (err) {
      if (createOptions?.debug) logger.debug('createFile', err)
      return false
    }
  }

  /** @inheritDoc */
  async removeFile(source: string) {
    await fsUnlink(source)
    return true
  }

  /** @inheritDoc */
  async queueRemoveFile(source: string) {
    return this.removeFile(source)
  }

  /** @inheritDoc */
  async copyFile(source: string, dest: string) {
    await fsCopyFile(source, dest)
    return true
  }

  /** @inheritDoc */
  async replaceFile(
    urlText: string,
    writeCallback: (stream: WritableStreamTree) => Promise<boolean>,
    createOptions?: CreateOptions,
    version?: string | number
  ): Promise<boolean> {
    // If the file doesnt exist, creating it suffices.
    if (version === 0 || (!version && !(await this.fileExists(urlText)))) {
      const created = await this.createFile(urlText, writeCallback, createOptions)
      if (created) return true
      if (version === 0) return false
      // But another creator may have succeeded just before us.
    }

    // Open the existing file and lock it.
    const fd = await fsOpen(urlText, 'rs+')
    try {
      const err = await fsFlock(fd, 'ex')
      if (err) {
        if (createOptions?.debug) logger.debug('replaceFile: flock', err)
        await fsClose(fd)
        return false
      }

      // Bail out if version matching was requested and the versions don't match.
      if (version) {
        const hash = await hashStream(fs.createReadStream(null as any, { fd, autoClose: false }))
        if (hash !== version) {
          if (createOptions?.debug) logger.debug(`replaceFile: ${hash} != ${version}`)
          await fsClose(fd)
          return false
        }
      }

      // Actually replace the file.
      await fsFtruncate(fd, 0)
      return await writeCallback(
        StreamTree.writable(fs.createWriteStream(null as any, { fd, start: 0 }))
      )
    } catch (err) {
      if (createOptions?.debug) logger.debug('replaceFile', err)
      await fsClose(fd)
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
    // If the file doesnt exist, creating it suffices.
    if (
      appendOptions?.version === 0 ||
      (!appendOptions?.version && !(await this.fileExists(urlText)))
    ) {
      const created = await this.createFile(urlText, createCallback, createOptions)
      if (created) return this.getFileStatus(urlText)
      if (appendOptions?.version === 0) return null
    }

    // Open the existing file and lock it.
    const fd = await fsOpen(urlText, 'r+')
    try {
      const err = await fsFlock(fd, 'ex')
      if (err) {
        if (createOptions?.debug) logger.debug('appendToFile: flock', err)
        await fsClose(fd)
        return null
      }

      // Bail out if version matching was requested and the versions don't match.
      if (appendOptions?.version) {
        const hash = await hashStream(fs.createReadStream(null as any, { fd, autoClose: false }))
        if (hash !== appendOptions.version) {
          if (createOptions?.debug) {
            logger.debug(`appendToFile: ${hash} != ${appendOptions.version}`)
          }
          await fsClose(fd)
          return null
        }
      }

      // Actually append to the file.
      await fsSeek(fd, 0, fsConstants.SEEK_END)
      const wrote = await writeCallback(
        StreamTree.writable(fs.createWriteStream(null as any, { autoClose: false, fd }))
      )
      if (!wrote) {
        if (createOptions?.debug) logger.debug('appendToFile: append failed')
        await fsClose(fd)
        return null
      }

      // Return the new file length, and the (hash) version if requested.
      const stat = await fsFstat(fd)
      const version =
        (appendOptions?.returnVersion &&
          (await hashStream(
            fs.createReadStream(null as any, { autoClose: false, fd, start: 0 })
          ))) ||
        ''
      await fsClose(fd)

      return {
        url: urlText,
        modified: stat.mtime,
        size: stat.size,
        inode: stat.ino,
        version,
      }
    } catch (err) {
      if (createOptions?.debug) logger.debug('appendToFile', err)
      await fsClose(fd)
      return null
    }
  }
}
