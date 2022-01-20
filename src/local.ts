import * as fs from 'fs'
import { constants as fsConstants, flock, seek } from 'fs-ext'
import glob from 'glob'
import * as path from 'path'
import { Writable } from 'stream'
import StreamTree, { WritableStreamTree } from 'tree-stream'
import { promisify } from 'util'
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
import { hashStream } from './stream'
import { logger, zlib } from './util'

const fsAccess = promisify(fs.access)
const fsCopyFile = promisify(fs.copyFile)
const fsClose = promisify(fs.close)
const fsFlock = (fd: number, flags: 'sh' | 'ex' | 'shnb' | 'exnb' | 'un') =>
  new Promise((resolve, _) => flock(fd, flags, (err) => resolve(err)))
const fsFstat = promisify(fs.fstat)
const fsFtruncate = promisify(fs.ftruncate)
const fsOpen = promisify(fs.open)
const fsReaddir = promisify(fs.readdir)
const fsRename = promisify(fs.rename)
const fsRmdir = promisify(fs.rmdir)
const fsSeek = promisify(seek)
const fsStat = promisify(fs.stat)
const fsUnlink = promisify(fs.unlink)
const fsGlob = promisify(glob)

/**
 * Local [[FileSystem]] implemented with `fs` and `fs-ext`.
 */
export class LocalFileSystem extends FileSystem {
  /** @inheritDoc */
  async readDirectory(urlText: string, options?: ReadDirectoryOptions): Promise<DirectoryEntry[]> {
    let files = options?.recursive
      ? (await fsGlob(path.join(urlText, '**/*'), { nodir: true })).map((x) =>
          x.substring(urlText.length + (urlText.endsWith('/') ? 0 : 1))
        )
      : await fsReaddir(urlText)
    if (options?.prefix) files = files.filter((x) => x.startsWith(options.prefix ?? ''))
    return files.map((x) => ({ url: path.join(urlText, x) }))
  }

  /** @inheritDoc */
  async ensureDirectory(urlText: string, options?: EnsureDirectoryOptions) {
    return new Promise<boolean>((resolve, reject) => {
      fs.mkdir(urlText, { mode: options?.mask ?? 0o755, recursive: true }, (err) => {
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
  async removeDirectory(urlText: string) {
    await fsRmdir(urlText)
    return true
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
  async getFileStatus(urlText: string, options?: GetFileStatusOptions) {
    const version = (options?.version && (await hashStream(fs.createReadStream(urlText)))) || ''
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
  async openReadableFile(url: string, options?: OpenReadableFileOptions) {
    let stream = StreamTree.readable(
      fs.createReadStream(url, {
        start: options?.byteOffset,
        end: options?.byteLength ? (options?.byteOffset ?? 0) + options.byteLength - 1 : undefined,
      })
    )
    if (url.endsWith('.gz')) stream = stream.pipe(zlib.createGunzip())
    return stream
  }

  /** @inheritDoc */
  async openWritableFile(url: string, _options?: OpenWritableFileOptions) {
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
    options?: CreateOptions
  ) {
    try {
      return await createCallback(
        StreamTree.writable(fs.createWriteStream(urlText, { flags: 'ax' }))
      )
    } catch (err) {
      if (options?.debug) logger.debug('createFile', err)
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
  async moveFile(source: string, dest: string) {
    await fsRename(source, dest)
    return true
  }

  /** @inheritDoc */
  async replaceFile(
    urlText: string,
    writeCallback: (stream: WritableStreamTree) => Promise<boolean>,
    options?: ReplaceFileOptions
  ): Promise<boolean> {
    // If the file doesnt exist, creating it suffices.
    if (options?.version === 0 || (!options?.version && !(await this.fileExists(urlText)))) {
      const created = await this.createFile(urlText, writeCallback, options)
      if (created) return true
      if (options?.version === 0) return false
      // But another creator may have succeeded just before us.
    }

    // Open the existing file and lock it.
    const fd = await fsOpen(urlText, 'rs+')
    try {
      const err = await fsFlock(fd, 'ex')
      if (err) {
        if (options?.debug) logger.debug('replaceFile: flock', err)
        await fsClose(fd)
        return false
      }

      // Bail out if version matching was requested and the versions don't match.
      if (options?.version) {
        const hash = await hashStream(fs.createReadStream(null as any, { fd, autoClose: false }))
        if (hash !== options?.version) {
          if (options?.debug) logger.debug(`replaceFile: ${hash} != ${options?.version}`)
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
      if (options?.debug) logger.debug('replaceFile', err)
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
