[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [fs](../modules/fs.md) / AnyFileSystem

# Class: AnyFileSystem

[fs](../modules/fs.md).AnyFileSystem

Class Adapter Pattern wrapping [FileSystem](fs.filesystem.md) by `urlPrefix`.

## Hierarchy

- [*FileSystem*](fs.filesystem.md)

  ↳ **AnyFileSystem**

## Table of contents

### Constructors

- [constructor](fs.anyfilesystem.md#constructor)

### Properties

- [supported](fs.anyfilesystem.md#supported)

### Methods

- [appendToFile](fs.anyfilesystem.md#appendtofile)
- [copyFile](fs.anyfilesystem.md#copyfile)
- [createFile](fs.anyfilesystem.md#createfile)
- [ensureDirectory](fs.anyfilesystem.md#ensuredirectory)
- [fileExists](fs.anyfilesystem.md#fileexists)
- [getFileStatus](fs.anyfilesystem.md#getfilestatus)
- [getFs](fs.anyfilesystem.md#getfs)
- [moveFile](fs.anyfilesystem.md#movefile)
- [openReadableFile](fs.anyfilesystem.md#openreadablefile)
- [openWritableFile](fs.anyfilesystem.md#openwritablefile)
- [queueRemoveFile](fs.anyfilesystem.md#queueremovefile)
- [readDirectory](fs.anyfilesystem.md#readdirectory)
- [removeDirectory](fs.anyfilesystem.md#removedirectory)
- [removeFile](fs.anyfilesystem.md#removefile)
- [replaceFile](fs.anyfilesystem.md#replacefile)

## Constructors

### constructor

\+ **new AnyFileSystem**(`supported`: { `fs`: [*FileSystem*](fs.filesystem.md) ; `urlPrefix`: *string*  }[]): [*AnyFileSystem*](fs.anyfilesystem.md)

Construct an [AnyFileSystem](fs.anyfilesystem.md) wrapping the provided [FileSystem](fs.filesystem.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `supported` | { `fs`: [*FileSystem*](fs.filesystem.md) ; `urlPrefix`: *string*  }[] | The [FileSystem](fs.filesystem.md) to delegate according to `urlPrefix`. |

**Returns:** [*AnyFileSystem*](fs.anyfilesystem.md)

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:198](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L198)

## Properties

### supported

• **supported**: { `fs`: [*FileSystem*](fs.filesystem.md) ; `urlPrefix`: *string*  }[]

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

Defined in: [fs.ts:290](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L290)

___

### copyFile

▸ **copyFile**(`sourceUrlText`: *string*, `destUrlText`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceUrlText` | *string* |
| `destUrlText` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:271](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L271)

___

### createFile

▸ **createFile**(`urlText`: *string*, `createCallback?`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `options?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `createCallback?` | (`stream`: WritableStreamTree) => *Promise*<boolean\> |
| `options?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:252](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L252)

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

Defined in: [fs.ts:222](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L222)

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

Defined in: [fs.ts:232](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L232)

___

### getFileStatus

▸ **getFileStatus**(`urlText`: *string*, `options?`: [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md)): *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md)\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `options?` | [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md) |

**Returns:** *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md)\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:237](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L237)

___

### getFs

▸ **getFs**(`url`: *string*): [*FileSystem*](fs.filesystem.md)

Returns the [FileSystem](fs.filesystem.md) provider for `url`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL of the file. |

**Returns:** [*FileSystem*](fs.filesystem.md)

Defined in: [fs.ts:211](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L211)

___

### moveFile

▸ **moveFile**(`sourceUrlText`: *string*, `destUrlText`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceUrlText` | *string* |
| `destUrlText` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:276](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L276)

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

Defined in: [fs.ts:242](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L242)

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

Defined in: [fs.ts:247](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L247)

___

### queueRemoveFile

▸ **queueRemoveFile**(`urlText`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:266](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L266)

___

### readDirectory

▸ **readDirectory**(`urlText`: *string*, `options?`: [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md)): *Promise*<string[]\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `options?` | [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md) |

**Returns:** *Promise*<string[]\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:217](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L217)

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

Defined in: [fs.ts:227](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L227)

___

### removeFile

▸ **removeFile**(`urlText`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:261](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L261)

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

Defined in: [fs.ts:281](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L281)
