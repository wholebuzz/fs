[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [http](../modules/http.md) / HTTPFileSystem

# Class: HTTPFileSystem

[http](../modules/http.md).HTTPFileSystem

HTTP [FileSystem](fs.filesystem.md) implemented with `axios`.

## Hierarchy

- [*FileSystem*](fs.filesystem.md)

  ↳ **HTTPFileSystem**

## Table of contents

### Constructors

- [constructor](http.httpfilesystem.md#constructor)

### Properties

- [options](http.httpfilesystem.md#options)

### Methods

- [appendToFile](http.httpfilesystem.md#appendtofile)
- [copyFile](http.httpfilesystem.md#copyfile)
- [createFile](http.httpfilesystem.md#createfile)
- [ensureDirectory](http.httpfilesystem.md#ensuredirectory)
- [fileExists](http.httpfilesystem.md#fileexists)
- [getFileStatus](http.httpfilesystem.md#getfilestatus)
- [moveFile](http.httpfilesystem.md#movefile)
- [openReadableFile](http.httpfilesystem.md#openreadablefile)
- [openWritableFile](http.httpfilesystem.md#openwritablefile)
- [queueRemoveFile](http.httpfilesystem.md#queueremovefile)
- [readDirectory](http.httpfilesystem.md#readdirectory)
- [removeDirectory](http.httpfilesystem.md#removedirectory)
- [removeFile](http.httpfilesystem.md#removefile)
- [replaceFile](http.httpfilesystem.md#replacefile)

## Constructors

### constructor

\+ **new HTTPFileSystem**(`options?`: *Record*<string, any\>): [*HTTPFileSystem*](http.httpfilesystem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | *Record*<string, any\> |

**Returns:** [*HTTPFileSystem*](http.httpfilesystem.md)

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:22](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L22)

## Properties

### options

• `Optional` **options**: *Record*<string, any\>

## Methods

### appendToFile

▸ **appendToFile**(`_urlText`: *string*, `_writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `_createCallback?`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `_createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md), `_appendOptions?`: [*AppendOptions*](../interfaces/fs.appendoptions.md)): *Promise*<``null`` \| [*FileStatus*](../interfaces/fs.filestatus.md)\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |
| `_writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> |
| `_createCallback?` | (`stream`: WritableStreamTree) => *Promise*<boolean\> |
| `_createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |
| `_appendOptions?` | [*AppendOptions*](../interfaces/fs.appendoptions.md) |

**Returns:** *Promise*<``null`` \| [*FileStatus*](../interfaces/fs.filestatus.md)\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:136](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L136)

___

### copyFile

▸ **copyFile**(`_sourceUrlText`: *string*, `_destUrlText`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_sourceUrlText` | *string* |
| `_destUrlText` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:117](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L117)

___

### createFile

▸ **createFile**(`_urlText`: *string*, `_createCallback?`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `_options?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |
| `_createCallback?` | (`stream`: WritableStreamTree) => *Promise*<boolean\> |
| `_options?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:93](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L93)

___

### ensureDirectory

▸ **ensureDirectory**(`_urlText`: *string*, `_options?`: [*EnsureDirectoryOptions*](../interfaces/fs.ensuredirectoryoptions.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |
| `_options?` | [*EnsureDirectoryOptions*](../interfaces/fs.ensuredirectoryoptions.md) |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:33](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L33)

___

### fileExists

▸ **fileExists**(`url`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:43](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L43)

___

### getFileStatus

▸ **getFileStatus**(`url`: *string*, `_options?`: [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md)): *Promise*<{ `inode`: *number* = 0; `modified`: Date ; `size`: *any* ; `url`: *string* ; `version`: *number* = 0 }\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `_options?` | [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md) |

**Returns:** *Promise*<{ `inode`: *number* = 0; `modified`: Date ; `size`: *any* ; `url`: *string* ; `version`: *number* = 0 }\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:53](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L53)

___

### moveFile

▸ **moveFile**(`_sourceUrlText`: *string*, `_destUrlText`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_sourceUrlText` | *string* |
| `_destUrlText` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:122](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L122)

___

### openReadableFile

▸ **openReadableFile**(`url`: *string*, `_options`: [*OpenReadableFileOptions*](../interfaces/fs.openreadablefileoptions.md)): *Promise*<ReadableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `_options` | [*OpenReadableFileOptions*](../interfaces/fs.openreadablefileoptions.md) |

**Returns:** *Promise*<ReadableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:65](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L65)

___

### openWritableFile

▸ **openWritableFile**(`url`: *string*, `options?`: [*OpenWritableFileOptions*](../interfaces/fs.openwritablefileoptions.md)): *Promise*<WritableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `options?` | [*OpenWritableFileOptions*](../interfaces/fs.openwritablefileoptions.md) |

**Returns:** *Promise*<WritableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:82](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L82)

___

### queueRemoveFile

▸ **queueRemoveFile**(`_urlText`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:112](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L112)

___

### readDirectory

▸ **readDirectory**(`_urlText`: *string*, `_options?`: [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md)): *Promise*<never[]\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |
| `_options?` | [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md) |

**Returns:** *Promise*<never[]\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:28](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L28)

___

### removeDirectory

▸ **removeDirectory**(`_urlText`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:38](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L38)

___

### removeFile

▸ **removeFile**(`url`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:102](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L102)

___

### replaceFile

▸ **replaceFile**(`_urlText`: *string*, `_writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `_options?`: [*ReplaceFileOptions*](../interfaces/fs.replacefileoptions.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |
| `_writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> |
| `_options?` | [*ReplaceFileOptions*](../interfaces/fs.replacefileoptions.md) |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:127](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L127)
