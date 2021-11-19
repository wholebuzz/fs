[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [smb](../modules/smb.md) / SMBFileSystem

# Class: SMBFileSystem

[smb](../modules/smb.md).SMBFileSystem

SMB [FileSystem](fs.filesystem.md) implemented with `@marsaud/smb2`.

## Hierarchy

- [*FileSystem*](fs.filesystem.md)

  ↳ **SMBFileSystem**

## Table of contents

### Constructors

- [constructor](smb.smbfilesystem.md#constructor)

### Properties

- [smb2](smb.smbfilesystem.md#smb2)
- [urlPrefix](smb.smbfilesystem.md#urlprefix)

### Methods

- [appendToFile](smb.smbfilesystem.md#appendtofile)
- [copyFile](smb.smbfilesystem.md#copyfile)
- [createFile](smb.smbfilesystem.md#createfile)
- [ensureDirectory](smb.smbfilesystem.md#ensuredirectory)
- [fileExists](smb.smbfilesystem.md#fileexists)
- [getFileStatus](smb.smbfilesystem.md#getfilestatus)
- [moveFile](smb.smbfilesystem.md#movefile)
- [openReadableFile](smb.smbfilesystem.md#openreadablefile)
- [openWritableFile](smb.smbfilesystem.md#openwritablefile)
- [parseUrl](smb.smbfilesystem.md#parseurl)
- [queueRemoveFile](smb.smbfilesystem.md#queueremovefile)
- [readDirectory](smb.smbfilesystem.md#readdirectory)
- [removeDirectory](smb.smbfilesystem.md#removedirectory)
- [removeFile](smb.smbfilesystem.md#removefile)
- [replaceFile](smb.smbfilesystem.md#replacefile)

## Constructors

### constructor

\+ **new SMBFileSystem**(`urlPrefix`: *string*, `options`: { `domain`: *string* ; `password`: *string* ; `port?`: *number* ; `share`: *string* ; `username`: *string*  }): [*SMBFileSystem*](smb.smbfilesystem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlPrefix` | *string* |
| `options` | *object* |
| `options.domain` | *string* |
| `options.password` | *string* |
| `options.port?` | *number* |
| `options.share` | *string* |
| `options.username` | *string* |

**Returns:** [*SMBFileSystem*](smb.smbfilesystem.md)

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/smb.ts:22](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L22)

## Properties

### smb2

• **smb2**: *SMB2*

Defined in: [src/smb.ts:22](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L22)

___

### urlPrefix

• **urlPrefix**: *string*

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

Defined in: [src/smb.ts:143](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L143)

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

Defined in: [src/smb.ts:123](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L123)

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

Defined in: [src/smb.ts:103](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L103)

___

### ensureDirectory

▸ **ensureDirectory**(`url`: *string*, `options?`: [*EnsureDirectoryOptions*](../interfaces/fs.ensuredirectoryoptions.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `options?` | [*EnsureDirectoryOptions*](../interfaces/fs.ensuredirectoryoptions.md) |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/smb.ts:49](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L49)

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

Defined in: [src/smb.ts:61](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L61)

___

### getFileStatus

▸ **getFileStatus**(`url`: *string*, `_options?`: [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md)): *Promise*<{ `inode`: *number* = 0; `modified`: Date ; `size`: *number* = 0; `url`: *string* ; `version`: *number* = 0 }\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `_options?` | [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md) |

**Returns:** *Promise*<{ `inode`: *number* = 0; `modified`: Date ; `size`: *number* = 0; `url`: *string* ; `version`: *number* = 0 }\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/smb.ts:71](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L71)

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

Defined in: [src/smb.ts:128](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L128)

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

Defined in: [src/smb.ts:83](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L83)

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

Defined in: [src/smb.ts:96](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L96)

___

### parseUrl

▸ **parseUrl**(`url`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |

**Returns:** *string*

Defined in: [src/smb.ts:38](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L38)

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

Defined in: [src/smb.ts:118](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L118)

___

### readDirectory

▸ **readDirectory**(`url`: *string*, `_options?`: [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md)): *Promise*<{ `url`: *string*  }[]\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `_options?` | [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md) |

**Returns:** *Promise*<{ `url`: *string*  }[]\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/smb.ts:44](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L44)

___

### removeDirectory

▸ **removeDirectory**(`url`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/smb.ts:55](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L55)

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

Defined in: [src/smb.ts:112](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L112)

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

Defined in: [src/smb.ts:134](https://github.com/wholebuzz/fs/blob/master/src/smb.ts#L134)
