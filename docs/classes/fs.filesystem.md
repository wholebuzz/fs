[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [fs](../modules/fs.md) / FileSystem

# Class: FileSystem

[fs](../modules/fs.md).FileSystem

File system interface for atomic primitives enabling multiple readers and writers.

## Hierarchy

- **FileSystem**

  ↳ [*AzureBlobStorageFileSystem*](azure_blob.azureblobstoragefilesystem.md)

  ↳ [*AnyFileSystem*](fs.anyfilesystem.md)

  ↳ [*GoogleCloudFileSystem*](gcp.googlecloudfilesystem.md)

  ↳ [*HTTPFileSystem*](http.httpfilesystem.md)

  ↳ [*LocalFileSystem*](local.localfilesystem.md)

  ↳ [*S3FileSystem*](s3.s3filesystem.md)

  ↳ [*SMBFileSystem*](smb.smbfilesystem.md)

## Table of contents

### Constructors

- [constructor](fs.filesystem.md#constructor)

### Methods

- [appendToFile](fs.filesystem.md#appendtofile)
- [copyFile](fs.filesystem.md#copyfile)
- [createFile](fs.filesystem.md#createfile)
- [ensureDirectory](fs.filesystem.md#ensuredirectory)
- [fileExists](fs.filesystem.md#fileexists)
- [getFileStatus](fs.filesystem.md#getfilestatus)
- [moveFile](fs.filesystem.md#movefile)
- [openReadableFile](fs.filesystem.md#openreadablefile)
- [openWritableFile](fs.filesystem.md#openwritablefile)
- [queueRemoveFile](fs.filesystem.md#queueremovefile)
- [readDirectory](fs.filesystem.md#readdirectory)
- [readDirectoryStream](fs.filesystem.md#readdirectorystream)
- [removeDirectory](fs.filesystem.md#removedirectory)
- [removeFile](fs.filesystem.md#removefile)
- [replaceFile](fs.filesystem.md#replacefile)

## Constructors

### constructor

\+ **new FileSystem**(): [*FileSystem*](fs.filesystem.md)

**Returns:** [*FileSystem*](fs.filesystem.md)

## Methods

### appendToFile

▸ `Abstract` **appendToFile**(`urlText`: *string*, `writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createCallback?`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md), `appendOptions?`: [*AppendOptions*](../interfaces/fs.appendoptions.md)): *Promise*<``null`` \| [*FileStatus*](../interfaces/fs.filestatus.md)\>

Appends to the file, safely.  Either `writeCallback` or `createCallback` is called.
For simple appends, the same paramter can be supplied for both `writeCallback` and
`createCallback`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to append to. |
| `writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for appending to the file. |
| `createCallback?` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for initializing the file, if necessary. |
| `createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) | Initial metadata for initializing the file, if necessary. |
| `appendOptions?` | [*AppendOptions*](../interfaces/fs.appendoptions.md) | - |

**Returns:** *Promise*<``null`` \| [*FileStatus*](../interfaces/fs.filestatus.md)\>

Defined in: [src/fs.ts:209](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L209)

___

### copyFile

▸ `Abstract` **copyFile**(`sourceUrlText`: *string*, `destUrlText`: *string*): *Promise*<boolean\>

Copies the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sourceUrlText` | *string* | The URL of the source file to copy. |
| `destUrlText` | *string* | The destination URL to copy the file to. |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:178](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L178)

___

### createFile

▸ `Abstract` **createFile**(`urlText`: *string*, `createCallback?`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `options?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<boolean\>

Creates file, failing if the file already exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to create. |
| `createCallback?` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for initializing the file. |
| `options?` | [*CreateOptions*](../interfaces/fs.createoptions.md) | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:155](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L155)

___

### ensureDirectory

▸ `Abstract` **ensureDirectory**(`urlText`: *string*, `options?`: [*EnsureDirectoryOptions*](../interfaces/fs.ensuredirectoryoptions.md)): *Promise*<boolean\>

Ensures the directory exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the directory. |
| `options?` | [*EnsureDirectoryOptions*](../interfaces/fs.ensuredirectoryoptions.md) | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:109](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L109)

___

### fileExists

▸ `Abstract` **fileExists**(`urlText`: *string*): *Promise*<boolean\>

Returns `true` if the file exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to check whether exists. |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:121](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L121)

___

### getFileStatus

▸ `Abstract` **getFileStatus**(`urlText`: *string*, `options?`: [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md)): *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md)\>

Determines the file status. The file version is used to implement atomic mutations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to retrieve the status for. |
| `options?` | [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md) | - |

**Returns:** *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md)\>

Defined in: [src/fs.ts:127](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L127)

___

### moveFile

▸ `Abstract` **moveFile**(`sourceUrlText`: *string*, `destUrlText`: *string*): *Promise*<boolean\>

Moves the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sourceUrlText` | *string* | The URL of the source file to copy. |
| `destUrlText` | *string* | The destination URL to copy the file to. |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:185](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L185)

___

### openReadableFile

▸ `Abstract` **openReadableFile**(`url`: *string*, `options?`: [*OpenReadableFileOptions*](../interfaces/fs.openreadablefileoptions.md)): *Promise*<ReadableStreamTree\>

Opens a file for reading.

**`optional`** version Fails if version doesn't match for GCS URLs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL of the file to read from. |
| `options?` | [*OpenReadableFileOptions*](../interfaces/fs.openreadablefileoptions.md) | - |

**Returns:** *Promise*<ReadableStreamTree\>

Defined in: [src/fs.ts:134](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L134)

___

### openWritableFile

▸ `Abstract` **openWritableFile**(`url`: *string*, `options?`: [*OpenWritableFileOptions*](../interfaces/fs.openwritablefileoptions.md)): *Promise*<WritableStreamTree\>

Opens a file for writing.

**`optional`** version Fails if version doesn't match for GCS URLs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL of the file to write to. |
| `options?` | [*OpenWritableFileOptions*](../interfaces/fs.openwritablefileoptions.md) | - |

**Returns:** *Promise*<WritableStreamTree\>

Defined in: [src/fs.ts:144](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L144)

___

### queueRemoveFile

▸ `Abstract` **queueRemoveFile**(`urlText`: *string*): *Promise*<boolean\>

Queues deletion, e.g. after DaysSinceCustomTime.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to remove. |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:171](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L171)

___

### readDirectory

▸ `Abstract` **readDirectory**(`urlText`: *string*, `options?`: [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md)): *Promise*<[*DirectoryEntry*](../interfaces/fs.directoryentry.md)[]\>

Returns the URLs of the files in a directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the directory to list files in. |
| `options?` | [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md) | - |

**Returns:** *Promise*<[*DirectoryEntry*](../interfaces/fs.directoryentry.md)[]\>

Defined in: [src/fs.ts:94](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L94)

___

### readDirectoryStream

▸ `Abstract` **readDirectoryStream**(`urlText`: *string*, `options?`: [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md)): *Promise*<ReadableStreamTree\>

Returns a stream of the URLs of the files in a directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the directory to list files in. |
| `options?` | [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md) | - |

**Returns:** *Promise*<ReadableStreamTree\>

Defined in: [src/fs.ts:100](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L100)

___

### removeDirectory

▸ `Abstract` **removeDirectory**(`urlText`: *string*, `options?`: [*RemoveDirectoryOptions*](../interfaces/fs.removedirectoryoptions.md)): *Promise*<boolean\>

Removes the directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the directory. |
| `options?` | [*RemoveDirectoryOptions*](../interfaces/fs.removedirectoryoptions.md) | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:115](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L115)

___

### removeFile

▸ `Abstract` **removeFile**(`urlText`: *string*): *Promise*<boolean\>

Deletes the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to remove. |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:165](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L165)

___

### replaceFile

▸ `Abstract` **replaceFile**(`urlText`: *string*, `writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `options?`: [*ReplaceFileOptions*](../interfaces/fs.replacefileoptions.md)): *Promise*<boolean\>

Replaces the file, failing if the file version doesn't match.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to replace. |
| `writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for replacing the file. |
| `options?` | [*ReplaceFileOptions*](../interfaces/fs.replacefileoptions.md) | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:194](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L194)
