[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [azure-blob](../modules/azure_blob.md) / AzureBlobStorageFileSystem

# Class: AzureBlobStorageFileSystem

[azure-blob](../modules/azure_blob.md).AzureBlobStorageFileSystem

Azure Blob Storage [FileSystem](fs.filesystem.md) implemented with `@azure/storage-blob`.

## Hierarchy

- [*FileSystem*](fs.filesystem.md)

  ↳ **AzureBlobStorageFileSystem**

## Table of contents

### Constructors

- [constructor](azure_blob.azureblobstoragefilesystem.md#constructor)

### Properties

- [account](azure_blob.azureblobstoragefilesystem.md#account)
- [blobServiceClient](azure_blob.azureblobstoragefilesystem.md#blobserviceclient)
- [urlPrefix](azure_blob.azureblobstoragefilesystem.md#urlprefix)

### Methods

- [appendToFile](azure_blob.azureblobstoragefilesystem.md#appendtofile)
- [copyFile](azure_blob.azureblobstoragefilesystem.md#copyfile)
- [createFile](azure_blob.azureblobstoragefilesystem.md#createfile)
- [ensureDirectory](azure_blob.azureblobstoragefilesystem.md#ensuredirectory)
- [fileExists](azure_blob.azureblobstoragefilesystem.md#fileexists)
- [getFileStatus](azure_blob.azureblobstoragefilesystem.md#getfilestatus)
- [moveFile](azure_blob.azureblobstoragefilesystem.md#movefile)
- [openReadableFile](azure_blob.azureblobstoragefilesystem.md#openreadablefile)
- [openWritableFile](azure_blob.azureblobstoragefilesystem.md#openwritablefile)
- [parseUrl](azure_blob.azureblobstoragefilesystem.md#parseurl)
- [queueRemoveFile](azure_blob.azureblobstoragefilesystem.md#queueremovefile)
- [readDirectory](azure_blob.azureblobstoragefilesystem.md#readdirectory)
- [readDirectoryStream](azure_blob.azureblobstoragefilesystem.md#readdirectorystream)
- [removeDirectory](azure_blob.azureblobstoragefilesystem.md#removedirectory)
- [removeFile](azure_blob.azureblobstoragefilesystem.md#removefile)
- [replaceFile](azure_blob.azureblobstoragefilesystem.md#replacefile)

## Constructors

### constructor

\+ **new AzureBlobStorageFileSystem**(`urlPrefix`: *string*, `account`: *string*): [*AzureBlobStorageFileSystem*](azure_blob.azureblobstoragefilesystem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlPrefix` | *string* |
| `account` | *string* |

**Returns:** [*AzureBlobStorageFileSystem*](azure_blob.azureblobstoragefilesystem.md)

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/azure-blob.ts:26](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L26)

## Properties

### account

• **account**: *string*

___

### blobServiceClient

• **blobServiceClient**: *BlobServiceClient*

Defined in: [src/azure-blob.ts:26](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L26)

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

Defined in: [src/azure-blob.ts:154](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L154)

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

Defined in: [src/azure-blob.ts:135](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L135)

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

Defined in: [src/azure-blob.ts:116](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L116)

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

Defined in: [src/azure-blob.ts:61](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L61)

___

### fileExists

▸ **fileExists**(`_url`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_url` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/azure-blob.ts:71](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L71)

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

Defined in: [src/azure-blob.ts:76](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L76)

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

Defined in: [src/azure-blob.ts:140](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L140)

___

### openReadableFile

▸ **openReadableFile**(`urlText`: *string*, `options`: [*OpenReadableFileOptions*](../interfaces/fs.openreadablefileoptions.md)): *Promise*<ReadableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `options` | [*OpenReadableFileOptions*](../interfaces/fs.openreadablefileoptions.md) |

**Returns:** *Promise*<ReadableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/azure-blob.ts:87](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L87)

___

### openWritableFile

▸ **openWritableFile**(`urlText`: *string*, `_options?`: [*OpenWritableFileOptions*](../interfaces/fs.openwritablefileoptions.md)): *Promise*<WritableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `_options?` | [*OpenWritableFileOptions*](../interfaces/fs.openwritablefileoptions.md) |

**Returns:** *Promise*<WritableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/azure-blob.ts:104](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L104)

___

### parseUrl

▸ **parseUrl**(`url`: *string*): *object*

Parse an `azure-blob://bucket/file/name.txt` URL into `bucket` and `file/name.txt`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to parse. |

**Returns:** *object*

| Name | Type |
| :------ | :------ |
| `blobName` | *string* |
| `containerName` | *string* |

Defined in: [src/azure-blob.ts:41](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L41)

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

Defined in: [src/azure-blob.ts:130](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L130)

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

Defined in: [src/azure-blob.ts:51](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L51)

___

### readDirectoryStream

▸ **readDirectoryStream**(`_urlText`: *string*, `_options?`: [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md)): *Promise*<ReadableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |
| `_options?` | [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md) |

**Returns:** *Promise*<ReadableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/azure-blob.ts:56](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L56)

___

### removeDirectory

▸ **removeDirectory**(`_urlText`: *string*, `_options?`: [*RemoveDirectoryOptions*](../interfaces/fs.removedirectoryoptions.md)): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_urlText` | *string* |
| `_options?` | [*RemoveDirectoryOptions*](../interfaces/fs.removedirectoryoptions.md) |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/azure-blob.ts:66](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L66)

___

### removeFile

▸ **removeFile**(`_url`: *string*): *Promise*<boolean\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_url` | *string* |

**Returns:** *Promise*<boolean\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/azure-blob.ts:125](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L125)

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

Defined in: [src/azure-blob.ts:145](https://github.com/wholebuzz/fs/blob/master/src/azure-blob.ts#L145)
