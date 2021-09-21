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
- [openReadableFile](fs.anyfilesystem.md#openreadablefile)
- [openWritableFile](fs.anyfilesystem.md#openwritablefile)
- [queueRemoveFile](fs.anyfilesystem.md#queueremovefile)
- [readDirectory](fs.anyfilesystem.md#readdirectory)
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

Defined in: [fs.ts:170](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L170)

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

Defined in: [fs.ts:253](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L253)

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

Defined in: [fs.ts:238](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L238)

___

### createFile

▸ **createFile**(`urlText`: *string*, `createCallback?`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `createCallback?` | (`stream`: WritableStreamTree) => *Promise*<boolean\> |
| `createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:219](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L219)

___

### ensureDirectory

▸ **ensureDirectory**(`urlText`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:194](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L194)

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

Defined in: [fs.ts:199](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L199)

___

### getFileStatus

▸ **getFileStatus**(`urlText`: *string*, `getVersion?`: *boolean*): *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md)\>

**`inheritdoc`**

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `urlText` | *string* | - |
| `getVersion` | *boolean* | true |

**Returns:** *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md)\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:204](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L204)

___

### getFs

▸ **getFs**(`url`: *string*): [*FileSystem*](fs.filesystem.md)

Returns the [FileSystem](fs.filesystem.md) provider for `url`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL of the file. |

**Returns:** [*FileSystem*](fs.filesystem.md)

Defined in: [fs.ts:183](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L183)

___

### openReadableFile

▸ **openReadableFile**(`url`: *string*, `version?`: *string* \| *number*): *Promise*<ReadableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `version?` | *string* \| *number* |

**Returns:** *Promise*<ReadableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:209](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L209)

___

### openWritableFile

▸ **openWritableFile**(`url`: *string*, `version?`: *string* \| *number*, `options?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<WritableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `version?` | *string* \| *number* |
| `options?` | [*CreateOptions*](../interfaces/fs.createoptions.md) |

**Returns:** *Promise*<WritableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:214](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L214)

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

Defined in: [fs.ts:233](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L233)

___

### readDirectory

▸ **readDirectory**(`urlText`: *string*, `prefix?`: *string*): *Promise*<string[]\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `prefix?` | *string* |

**Returns:** *Promise*<string[]\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [fs.ts:189](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L189)

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

Defined in: [fs.ts:228](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L228)

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

Defined in: [fs.ts:243](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L243)
