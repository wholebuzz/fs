[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [fs](../modules/fs.md) / LocalFileSystem

# Class: LocalFileSystem

[fs](../modules/fs.md).LocalFileSystem

Local [FileSystem](fs.filesystem.md) implemented with `fs` and `fs-ext`.

## Hierarchy

- [*FileSystem*](fs.filesystem.md)

  ↳ **LocalFileSystem**

## Table of contents

### Constructors

- [constructor](fs.localfilesystem.md#constructor)

### Methods

- [appendToFile](fs.localfilesystem.md#appendtofile)
- [copyFile](fs.localfilesystem.md#copyfile)
- [createFile](fs.localfilesystem.md#createfile)
- [ensureDirectory](fs.localfilesystem.md#ensuredirectory)
- [fileExists](fs.localfilesystem.md#fileexists)
- [getFileStatus](fs.localfilesystem.md#getfilestatus)
- [openReadableFile](fs.localfilesystem.md#openreadablefile)
- [openWritableFile](fs.localfilesystem.md#openwritablefile)
- [queueRemoveFile](fs.localfilesystem.md#queueremovefile)
- [readDirectory](fs.localfilesystem.md#readdirectory)
- [removeFile](fs.localfilesystem.md#removefile)
- [replaceFile](fs.localfilesystem.md#replacefile)

## Constructors

### constructor

\+ **new LocalFileSystem**(): [*LocalFileSystem*](fs.localfilesystem.md)

**Returns:** [*LocalFileSystem*](fs.localfilesystem.md)

Inherited from: [FileSystem](fs.filesystem.md)

## Methods

### appendToFile

▸ **appendToFile**(`urlText`: *string*, `writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createCallback?`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md), `appendOptions?`: [*AppendOptions*](../interfaces/fs.appendoptions.md)): *Promise*<``null`` \| [*FileStatus*](../interfaces/fs.filestatus.md)\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> |
| `createCallback?` | (`stream`: WritableStreamTree) => *Promise*<boolean\> |
| `createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |
| `appendOptions?` | [*AppendOptions*](../interfaces/fs.appendoptions.md) |

**Returns:** *Promise*<``null`` \| [*FileStatus*](../interfaces/fs.filestatus.md)\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:412](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L412)

___

### copyFile

▸ **copyFile**(`source`: *string*, `dest`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | *string* |
| `dest` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:359](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L359)

___

### createFile

▸ **createFile**(`urlText`: *string*, `createCallback?`: WritableStreamTreeFilter, `createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `createCallback` | WritableStreamTreeFilter |
| `createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:330](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L330)

___

### ensureDirectory

▸ **ensureDirectory**(`urlText`: *string*, `mask?`: *number*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `urlText` | *string* | - |
| `mask` | *number* | 0o755 |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:279](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L279)

___

### fileExists

▸ **fileExists**(`urlText`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:293](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L293)

___

### getFileStatus

▸ **getFileStatus**(`urlText`: *string*, `getVersion?`: *boolean*): *Promise*<{ `inode`: *number* ; `modified`: Date ; `size`: *number* ; `url`: *string* ; `version`: *string*  }\>

**`inheritdoc`**

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `urlText` | *string* | - |
| `getVersion` | *boolean* | true |

**Returns:** *Promise*<{ `inode`: *number* ; `modified`: Date ; `size`: *number* ; `url`: *string* ; `version`: *string*  }\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:303](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L303)

___

### openReadableFile

▸ **openReadableFile**(`url`: *string*, `_?`: *string* \| *number*): *Promise*<ReadableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `_?` | *string* \| *number* |

**Returns:** *Promise*<ReadableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:316](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L316)

___

### openWritableFile

▸ **openWritableFile**(`url`: *string*, `_?`: *string* \| *number*, `__?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<WritableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `_?` | *string* \| *number* |
| `__?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |

**Returns:** *Promise*<WritableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:323](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L323)

___

### queueRemoveFile

▸ **queueRemoveFile**(`source`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:354](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L354)

___

### readDirectory

▸ **readDirectory**(`urlText`: *string*): *Promise*<string[]\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |

**Returns:** *Promise*<string[]\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:274](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L274)

___

### removeFile

▸ **removeFile**(`source`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:348](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L348)

___

### replaceFile

▸ **replaceFile**(`urlText`: *string*, `writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md), `version?`: *string* \| *number*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> |
| `createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |
| `version?` | *string* \| *number* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:365](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L365)
