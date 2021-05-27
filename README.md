# @wholebuzz/fs

`FileSystem` with atomic primitives enabling multiple readers and writers.

- `LocalFileSystem` employs content hashing to approximate [GCS Object Versioning](https://cloud.google.com/storage/docs/object-versioning). 
- `GoogleCloudFileSystem` provides consistent parallel access paterns.

# Example

```
import { AnyFileSystem, GoogleCloudFileSystem, LocalFileSystem } from '@wholebuzz/fs'

const fs = new AnyFileSystem([
  { urlPrefix: 'gs://', fs: new GoogleCloudFileSystem() },
  { urlPrefix: '', fs: new LocalFileSystem() },
])

const localStream = fs.openReadableStream('/etc/hosts')
const cloudStream = fs.openReadableStream('gs://bucket/file')
```

## API Reference

[@wholebuzz/fs](README.md) / Exports

# @wholebuzz/fs

## Table of contents

### Modules

- [fs](docs/modules/fs.md)
- [gcp](docs/modules/gcp.md)
- [util](docs/modules/util.md)

[@wholebuzz/fs](README.md) / [Exports](docs/modules.md) / [fs](docs/modules/fs.md) / FileSystem

# Class: FileSystem

[fs](docs/modules/fs.md).FileSystem

File system interface for atomic primitives enabling multiple readers and writers.

## Hierarchy

- **FileSystem**

  ↳ [*AnyFileSystem*](docs/classes/fs.anyfilesystem.md)

  ↳ [*LocalFileSystem*](docs/classes/fs.localfilesystem.md)

  ↳ [*GoogleCloudFileSystem*](docs/classes/gcp.googlecloudfilesystem.md)

## Table of contents

### Constructors

- [constructor](docs/classes/fs.filesystem.md#constructor)

### Methods

- [appendToFile](docs/classes/fs.filesystem.md#appendtofile)
- [copyFile](docs/classes/fs.filesystem.md#copyfile)
- [createFile](docs/classes/fs.filesystem.md#createfile)
- [ensureDirectory](docs/classes/fs.filesystem.md#ensuredirectory)
- [fileExists](docs/classes/fs.filesystem.md#fileexists)
- [getFileStatus](docs/classes/fs.filesystem.md#getfilestatus)
- [openReadableFile](docs/classes/fs.filesystem.md#openreadablefile)
- [openWritableFile](docs/classes/fs.filesystem.md#openwritablefile)
- [queueRemoveFile](docs/classes/fs.filesystem.md#queueremovefile)
- [readDirectory](docs/classes/fs.filesystem.md#readdirectory)
- [removeFile](docs/classes/fs.filesystem.md#removefile)
- [replaceFile](docs/classes/fs.filesystem.md#replacefile)

## Constructors

### constructor

\+ **new FileSystem**(): [*FileSystem*](docs/classes/fs.filesystem.md)

**Returns:** [*FileSystem*](docs/classes/fs.filesystem.md)

## Methods

### appendToFile

▸ `Abstract` **appendToFile**(`urlText`: *string*, `writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createCallback?`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createOptions?`: [*CreateOptions*](docs/interfaces/fs.createoptions.md), `appendOptions?`: [*AppendOptions*](docs/interfaces/fs.appendoptions.md)): *Promise*<``null`` \| [*FileStatus*](docs/interfaces/fs.filestatus.md)\>

Appends to the file, safely.  Either `writeCallback` or `createCallback` is called.
For simple appends, the same paramter can be supplied for both `writeCallback` and
`createCallback`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to append to. |
| `writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for appending to the file. |
| `createCallback?` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for initializing the file, if necessary. |
| `createOptions?` | [*CreateOptions*](docs/interfaces/fs.createoptions.md) | Initial metadata for initializing the file, if necessary. |
| `appendOptions?` | [*AppendOptions*](docs/interfaces/fs.appendoptions.md) | - |

**Returns:** *Promise*<``null`` \| [*FileStatus*](docs/interfaces/fs.filestatus.md)\>

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
