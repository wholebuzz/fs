[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [fs](../modules/fs.md) / FileSystem

# Class: FileSystem

[fs](../modules/fs.md).FileSystem

File system interface for atomic primitives enabling multiple readers and writers.

## Hierarchy

- **FileSystem**

  ↳ [*AnyFileSystem*](fs.anyfilesystem.md)

  ↳ [*LocalFileSystem*](fs.localfilesystem.md)

  ↳ [*GoogleCloudFileSystem*](gcp.googlecloudfilesystem.md)

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
- [openReadableFile](fs.filesystem.md#openreadablefile)
- [openWritableFile](fs.filesystem.md#openwritablefile)
- [queueRemoveFile](fs.filesystem.md#queueremovefile)
- [readDirectory](fs.filesystem.md#readdirectory)
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

Defined in: [fs.ts:157](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L157)

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

Defined in: [fs.ts:132](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L132)

___

### createFile

▸ `Abstract` **createFile**(`urlText`: *string*, `createCallback?`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<boolean\>

Creates file, failing if the file already exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to create. |
| `createCallback?` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for initializing the file. |
| `createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) | Initial metadata. |

**Returns:** *Promise*<boolean\>

Defined in: [fs.ts:109](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L109)

___

### ensureDirectory

▸ `Abstract` **ensureDirectory**(`urlText`: *string*, `mask?`: *number*): *Promise*<boolean\>

Ensures the directory exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the directory. |
| `mask?` | *number* | - |

**Returns:** *Promise*<boolean\>

Defined in: [fs.ts:71](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L71)

___

### fileExists

▸ `Abstract` **fileExists**(`urlText`: *string*): *Promise*<boolean\>

Returns `true` if the file exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to check whether exists. |

**Returns:** *Promise*<boolean\>

Defined in: [fs.ts:77](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L77)

___

### getFileStatus

▸ `Abstract` **getFileStatus**(`urlText`: *string*, `getVersion?`: *boolean*): *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md)\>

Determines the file status. The file version is used to implement atomic mutations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to retrieve the status for. |
| `getVersion?` | *boolean* | - |

**Returns:** *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md)\>

Defined in: [fs.ts:83](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L83)

___

### openReadableFile

▸ `Abstract` **openReadableFile**(`url`: *string*, `version?`: *string* \| *number*): *Promise*<ReadableStreamTree\>

Opens a file for reading.

**`optional`** version Fails if version doesn't match for GCS URLs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL of the file to read from. |
| `version?` | *string* \| *number* | - |

**Returns:** *Promise*<ReadableStreamTree\>

Defined in: [fs.ts:90](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L90)

___

### openWritableFile

▸ `Abstract` **openWritableFile**(`url`: *string*, `version?`: *string* \| *number*, `options?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<WritableStreamTree\>

Opens a file for writing.

**`optional`** version Fails if version doesn't match for GCS URLs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL of the file to write to. |
| `version?` | *string* \| *number* | - |
| `options?` | [*CreateOptions*](../interfaces/fs.createoptions.md) | - |

**Returns:** *Promise*<WritableStreamTree\>

Defined in: [fs.ts:97](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L97)

___

### queueRemoveFile

▸ `Abstract` **queueRemoveFile**(`urlText`: *string*): *Promise*<boolean\>

Queues deletion, e.g. after DaysSinceCustomTime.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to remove. |

**Returns:** *Promise*<boolean\>

Defined in: [fs.ts:125](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L125)

___

### readDirectory

▸ `Abstract` **readDirectory**(`urlText`: *string*): *Promise*<string[]\>

Returns the URLs of the files in a directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the directory to list files in. |

**Returns:** *Promise*<string[]\>

Defined in: [fs.ts:65](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L65)

___

### removeFile

▸ `Abstract` **removeFile**(`urlText`: *string*): *Promise*<boolean\>

Deletes the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to remove. |

**Returns:** *Promise*<boolean\>

Defined in: [fs.ts:119](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L119)

___

### replaceFile

▸ `Abstract` **replaceFile**(`urlText`: *string*, `writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md), `version?`: *string* \| *number*): *Promise*<boolean\>

Replaces the file, failing if the file version doesn't match.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to replace. |
| `writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for replacing the file. |
| `createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) | Initial metadata for replaced file. |
| `version?` | *string* \| *number* | The version of the file to replace. |

**Returns:** *Promise*<boolean\>

Defined in: [fs.ts:141](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L141)
