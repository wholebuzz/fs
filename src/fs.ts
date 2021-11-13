import { ReadableStreamTree, WritableStreamTree } from 'tree-stream'

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

export interface DirectoryEntry extends Partial<FileStatus> {
  url: string
}

/**
 * Options for creating a file.
 */
export interface CreateOptions {
  contentType?: string
  debug?: boolean
  gzip?: boolean | string
}

/**
 * Options when appending to a file.
 */
export interface AppendOptions {
  returnVersion?: boolean
  version?: string | number
}

/**
 * Options when opening a Readable file.
 */
export interface OpenReadableFileOptions {
  extra?: Record<string, any>
  query?: string
  version?: string | number
}

/**
 * Options when opening a Writable file.
 */
export interface OpenWritableFileOptions extends CreateOptions {
  extra?: Record<string, any>
  version?: string | number
}

export interface ReplaceFileOptions extends CreateOptions {
  version?: string | number
}

export interface GetFileStatusOptions {
  version?: boolean
}

export interface ReadDirectoryOptions {
  prefix?: string
}

export interface EnsureDirectoryOptions {
  mask?: number
}

/**
 * File system interface for atomic primitives enabling multiple readers and writers.
 */
export abstract class FileSystem {
  /**
   * Returns the URLs of the files in a directory.
   * @param urlText The URL of the directory to list files in.
   */
  abstract readDirectory(urlText: string, options?: ReadDirectoryOptions): Promise<DirectoryEntry[]>

  /**
   * Ensures the directory exists
   * @param urlText The URL of the directory.
   */
  abstract ensureDirectory(urlText: string, options?: EnsureDirectoryOptions): Promise<boolean>

  /**
   * Removes the directory
   * @param urlText The URL of the directory.
   */
  abstract removeDirectory(urlText: string): Promise<boolean>

  /**
   * Returns `true` if the file exists.
   * @param urlText The URL of the file to check whether exists.
   */
  abstract fileExists(urlText: string): Promise<boolean>

  /**
   * Determines the file status. The file version is used to implement atomic mutations.
   * @param urlText The URL of the file to retrieve the status for.
   */
  abstract getFileStatus(urlText: string, options?: GetFileStatusOptions): Promise<FileStatus>

  /**
   * Opens a file for reading.
   * @param url The URL of the file to read from.
   * @optional version Fails if version doesn't match for GCS URLs.
   */
  abstract openReadableFile(
    url: string,
    options?: OpenReadableFileOptions
  ): Promise<ReadableStreamTree>

  /**
   * Opens a file for writing.
   * @param url The URL of the file to write to.
   * @optional version Fails if version doesn't match for GCS URLs.
   */
  abstract openWritableFile(
    url: string,
    options?: OpenWritableFileOptions
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
    options?: CreateOptions
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
   * Moves the file.
   * @param sourceUrlText The URL of the source file to copy.
   * @param destUrlText The destination URL to copy the file to.
   */
  abstract moveFile(sourceUrlText: string, destUrlText: string): Promise<boolean>

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
    options?: ReplaceFileOptions
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
  async readDirectory(urlText: string, options?: ReadDirectoryOptions) {
    return this.getFs(urlText).readDirectory(urlText, options)
  }

  /** @inheritDoc */
  async ensureDirectory(urlText: string, options?: EnsureDirectoryOptions) {
    return this.getFs(urlText).ensureDirectory(urlText, options)
  }

  /** @inheritDoc */
  async removeDirectory(urlText: string) {
    return this.getFs(urlText).removeDirectory(urlText)
  }

  /** @inheritDoc */
  async fileExists(urlText: string) {
    return this.getFs(urlText).fileExists(urlText)
  }

  /** @inheritDoc */
  async getFileStatus(urlText: string, options?: GetFileStatusOptions) {
    return this.getFs(urlText).getFileStatus(urlText, options)
  }

  /** @inheritDoc */
  async openReadableFile(url: string, options?: OpenReadableFileOptions) {
    return this.getFs(url).openReadableFile(url, options)
  }

  /** @inheritDoc */
  async openWritableFile(url: string, options?: OpenWritableFileOptions) {
    return this.getFs(url).openWritableFile(url, options)
  }

  /** @inheritDoc */
  async createFile(
    urlText: string,
    createCallback?: (stream: WritableStreamTree) => Promise<boolean>,
    options?: CreateOptions
  ) {
    return this.getFs(urlText).createFile(urlText, createCallback, options)
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
  async moveFile(sourceUrlText: string, destUrlText: string) {
    return this.getFs(destUrlText).moveFile(sourceUrlText, destUrlText)
  }

  /** @inheritDoc */
  async replaceFile(
    urlText: string,
    writeCallback: (stream: WritableStreamTree) => Promise<boolean>,
    options?: ReplaceFileOptions
  ): Promise<boolean> {
    return this.getFs(urlText).replaceFile(urlText, writeCallback, options)
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
