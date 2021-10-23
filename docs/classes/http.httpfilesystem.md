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
- [openReadableFile](http.httpfilesystem.md#openreadablefile)
- [openWritableFile](http.httpfilesystem.md#openwritablefile)
- [queueRemoveFile](http.httpfilesystem.md#queueremovefile)
- [readDirectory](http.httpfilesystem.md#readdirectory)
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

Defined in: [http.ts:11](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L11)

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

Defined in: [http.ts:116](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L116)

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

Defined in: [http.ts:101](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L101)

___

### createFile

▸ **createFile**(`_urlText`: *string*, `_createCallback?`: WritableStreamTreeFilter, `_createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |
| `_createCallback` | WritableStreamTreeFilter |
| `_createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:75](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L75)

___

### ensureDirectory

▸ **ensureDirectory**(`_urlText`: *string*, `_mask?`: *number*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |
| `_mask?` | *number* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:22](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L22)

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

Defined in: [http.ts:27](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L27)

___

### getFileStatus

▸ **getFileStatus**(`url`: *string*, `_getVersion?`: *boolean*): *Promise*<{ `inode`: *number* = 0; `modified`: Date ; `size`: *any* ; `url`: *string* ; `version`: *number* = 0 }\>

**`inheritdoc`**

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | *string* | - |
| `_getVersion` | *boolean* | true |

**Returns:** *Promise*<{ `inode`: *number* = 0; `modified`: Date ; `size`: *any* ; `url`: *string* ; `version`: *number* = 0 }\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:37](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L37)

___

### openReadableFile

▸ **openReadableFile**(`url`: *string*, `_version?`: *string* \| *number*): *Promise*<ReadableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `_version?` | *string* \| *number* |

**Returns:** *Promise*<ReadableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:49](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L49)

___

### openWritableFile

▸ **openWritableFile**(`url`: *string*, `_version?`: *string* \| *number*, `options?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<WritableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `_version?` | *string* \| *number* |
| `options?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |

**Returns:** *Promise*<WritableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:66](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L66)

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

Defined in: [http.ts:96](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L96)

___

### readDirectory

▸ **readDirectory**(`_urlText`: *string*, `_prefix?`: *string*): *Promise*<string[]\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |
| `_prefix?` | *string* |

**Returns:** *Promise*<string[]\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:17](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L17)

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

Defined in: [http.ts:86](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L86)

___

### replaceFile

▸ **replaceFile**(`_urlText`: *string*, `_writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `_createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md), `_version?`: *string* \| *number*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |
| `_writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> |
| `_createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |
| `_version?` | *string* \| *number* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [http.ts:106](https://github.com/wholebuzz/fs/blob/master/src/http.ts#L106)
