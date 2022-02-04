[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [gcp](../modules/gcp.md) / GoogleCloudFileSystem

# Class: GoogleCloudFileSystem

[gcp](../modules/gcp.md).GoogleCloudFileSystem

Google Cloud Storage [FileSystem](fs.filesystem.md) implemented with `@google-cloud/storage`.

## Hierarchy

- [*FileSystem*](fs.filesystem.md)

  ↳ **GoogleCloudFileSystem**

## Table of contents

### Constructors

- [constructor](gcp.googlecloudfilesystem.md#constructor)

### Properties

- [storage](gcp.googlecloudfilesystem.md#storage)

### Methods

- [appendToFile](gcp.googlecloudfilesystem.md#appendtofile)
- [copyFile](gcp.googlecloudfilesystem.md#copyfile)
- [createFile](gcp.googlecloudfilesystem.md#createfile)
- [ensureDirectory](gcp.googlecloudfilesystem.md#ensuredirectory)
- [fileExists](gcp.googlecloudfilesystem.md#fileexists)
- [getBucket](gcp.googlecloudfilesystem.md#getbucket)
- [getFile](gcp.googlecloudfilesystem.md#getfile)
- [getFileStatus](gcp.googlecloudfilesystem.md#getfilestatus)
- [moveFile](gcp.googlecloudfilesystem.md#movefile)
- [openReadableFile](gcp.googlecloudfilesystem.md#openreadablefile)
- [openWritableFile](gcp.googlecloudfilesystem.md#openwritablefile)
- [parseUrl](gcp.googlecloudfilesystem.md#parseurl)
- [queueRemoveFile](gcp.googlecloudfilesystem.md#queueremovefile)
- [readDirectory](gcp.googlecloudfilesystem.md#readdirectory)
- [readDirectoryStream](gcp.googlecloudfilesystem.md#readdirectorystream)
- [removeDirectory](gcp.googlecloudfilesystem.md#removedirectory)
- [removeFile](gcp.googlecloudfilesystem.md#removefile)
- [replaceFile](gcp.googlecloudfilesystem.md#replacefile)

## Constructors

### constructor

\+ **new GoogleCloudFileSystem**(): [*GoogleCloudFileSystem*](gcp.googlecloudfilesystem.md)

By default, the client will authenticate using the service account file
specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
the project specified by the GCLOUD_PROJECT environment variable. See
https://cloud.google.com/docs/authentication/production#providing_credentials_to_your_application

**Returns:** [*GoogleCloudFileSystem*](gcp.googlecloudfilesystem.md)

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/gcp.ts:25](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L25)

## Properties

### storage

• **storage**: *Storage*

Defined in: [src/gcp.ts:25](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L25)

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

Defined in: [src/gcp.ts:209](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L209)

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

Defined in: [src/gcp.ts:176](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L176)

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

Defined in: [src/gcp.ts:145](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L145)

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

Defined in: [src/gcp.ts:94](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L94)

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

Defined in: [src/gcp.ts:104](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L104)

___

### getBucket

▸ **getBucket**(`urlText`: *string*): *Bucket*

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |

**Returns:** *Bucket*

Defined in: [src/gcp.ts:51](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L51)

___

### getFile

▸ **getFile**(`urlText`: *string*, `version?`: *string* \| *number*): *File*

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `version?` | *string* \| *number* |

**Returns:** *File*

Defined in: [src/gcp.ts:56](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L56)

___

### getFileStatus

▸ **getFileStatus**(`urlText`: *string*, `_options?`: [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md)): *Promise*<{ `inode`: *number* = 0; `modified`: *any* ; `size`: *any* ; `url`: *string* ; `version`: *any*  }\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `_options?` | [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md) |

**Returns:** *Promise*<{ `inode`: *number* = 0; `modified`: *any* ; `size`: *any* ; `url`: *string* ; `version`: *any*  }\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/gcp.ts:111](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L111)

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

Defined in: [src/gcp.ts:184](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L184)

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

Defined in: [src/gcp.ts:124](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L124)

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

Defined in: [src/gcp.ts:138](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L138)

___

### parseUrl

▸ **parseUrl**(`url`: *string*): *object*

Parse a `gs://bucket/file/name.txt` URL into `bucket` and `file/name.txt`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL to parse. |

**Returns:** *object*

| Name | Type |
| :------ | :------ |
| `bucket` | *string* |
| `filename` | *string* |

Defined in: [src/gcp.ts:42](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L42)

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

Defined in: [src/gcp.ts:170](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L170)

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

Defined in: [src/gcp.ts:63](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L63)

___

### readDirectoryStream

▸ **readDirectoryStream**(`urlText`: *string*, `options?`: [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md)): *Promise*<ReadableStreamTree\>

**`inheritdoc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `options?` | [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md) |

**Returns:** *Promise*<ReadableStreamTree\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [src/gcp.ts:76](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L76)

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

Defined in: [src/gcp.ts:99](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L99)

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

Defined in: [src/gcp.ts:164](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L164)

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

Defined in: [src/gcp.ts:189](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L189)
