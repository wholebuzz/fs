[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [local](../modules/local.md) / LocalFileSystem

# Class: LocalFileSystem

[local](../modules/local.md).LocalFileSystem

Local [FileSystem](fs.filesystem.md) implemented with `fs` and `fs-ext`.

## Hierarchy

- [*FileSystem*](fs.filesystem.md)

  ↳ **LocalFileSystem**

## Table of contents

### Constructors

- [constructor](local.localfilesystem.md#constructor)

### Methods

- [appendToFile](local.localfilesystem.md#appendtofile)
- [copyFile](local.localfilesystem.md#copyfile)
- [createFile](local.localfilesystem.md#createfile)
- [ensureDirectory](local.localfilesystem.md#ensuredirectory)
- [fileExists](local.localfilesystem.md#fileexists)
- [getFileStatus](local.localfilesystem.md#getfilestatus)
- [moveFile](local.localfilesystem.md#movefile)
- [openReadableFile](local.localfilesystem.md#openreadablefile)
- [openWritableFile](local.localfilesystem.md#openwritablefile)
- [queueRemoveFile](local.localfilesystem.md#queueremovefile)
- [readDirectory](local.localfilesystem.md#readdirectory)
- [removeDirectory](local.localfilesystem.md#removedirectory)
- [removeFile](local.localfilesystem.md#removefile)
- [replaceFile](local.localfilesystem.md#replacefile)

## Constructors

### constructor

\+ **new LocalFileSystem**(): [*LocalFileSystem*](local.localfilesystem.md)

**Returns:** [*LocalFileSystem*](local.localfilesystem.md)

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

Defined in: [src/local.ts:199](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L199)

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

Defined in: [src/local.ts:141](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L141)

___

### createFile

▸ **createFile**(`urlText`: *string*, `createCallback?`: WritableStreamTreeFilter, `options?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `createCallback` | WritableStreamTreeFilter |
| `options?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/local.ts:112](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L112)

___

### ensureDirectory

▸ **ensureDirectory**(`urlText`: *string*, `options?`: [*EnsureDirectoryOptions*](../interfaces/fs.ensuredirectoryoptions.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `options?` | [*EnsureDirectoryOptions*](../interfaces/fs.ensuredirectoryoptions.md) |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/local.ts:50](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L50)

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

Defined in: [src/local.ts:70](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L70)

___

### getFileStatus

▸ **getFileStatus**(`urlText`: *string*, `options?`: [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md)): *Promise*<{ `inode`: *number* ; `modified`: Date ; `size`: *number* ; `url`: *string* ; `version`: *string*  }\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `options?` | [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md) |

**Returns:** *Promise*<{ `inode`: *number* ; `modified`: Date ; `size`: *number* ; `url`: *string* ; `version`: *string*  }\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/local.ts:80](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L80)

___

### moveFile

▸ **moveFile**(`source`: *string*, `dest`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | *string* |
| `dest` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/local.ts:147](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L147)

___

### openReadableFile

▸ **openReadableFile**(`url`: *string*, `options?`: [*OpenReadableFileOptions*](../interfaces/fs.openreadablefileoptions.md)): *Promise*<ReadableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `options?` | [*OpenReadableFileOptions*](../interfaces/fs.openreadablefileoptions.md) |

**Returns:** *Promise*<ReadableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/local.ts:93](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L93)

___

### openWritableFile

▸ **openWritableFile**(`url`: *string*, `_options?`: [*OpenWritableFileOptions*](../interfaces/fs.openwritablefileoptions.md)): *Promise*<WritableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `_options?` | [*OpenWritableFileOptions*](../interfaces/fs.openwritablefileoptions.md) |

**Returns:** *Promise*<WritableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/local.ts:105](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L105)

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

Defined in: [src/local.ts:136](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L136)

___

### readDirectory

▸ **readDirectory**(`urlText`: *string*, `options?`: [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md)): *Promise*<[*DirectoryEntry*](../interfaces/fs.directoryentry.md)[]\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `options?` | [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md) |

**Returns:** *Promise*<[*DirectoryEntry*](../interfaces/fs.directoryentry.md)[]\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/local.ts:43](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L43)

___

### removeDirectory

▸ **removeDirectory**(`urlText`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/local.ts:64](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L64)

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

Defined in: [src/local.ts:130](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L130)

___

### replaceFile

▸ **replaceFile**(`urlText`: *string*, `writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `options?`: [*ReplaceFileOptions*](../interfaces/fs.replacefileoptions.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> |
| `options?` | [*ReplaceFileOptions*](../interfaces/fs.replacefileoptions.md) |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/local.ts:153](https://github.com/wholebuzz/fs/blob/master/src/local.ts#L153)
