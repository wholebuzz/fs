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
- [openReadableFile](gcp.googlecloudfilesystem.md#openreadablefile)
- [openWritableFile](gcp.googlecloudfilesystem.md#openwritablefile)
- [parseUrl](gcp.googlecloudfilesystem.md#parseurl)
- [queueRemoveFile](gcp.googlecloudfilesystem.md#queueremovefile)
- [readDirectory](gcp.googlecloudfilesystem.md#readdirectory)
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

Defined in: [gcp.ts:13](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L13)

## Properties

### storage

• **storage**: *Storage*

Defined in: [gcp.ts:13](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L13)

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

Defined in: [gcp.ts:168](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L168)

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

Defined in: [gcp.ts:139](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L139)

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

Defined in: [gcp.ts:108](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L108)

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

Defined in: [gcp.ts:64](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L64)

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

Defined in: [gcp.ts:69](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L69)

___

### getBucket

▸ **getBucket**(`urlText`: *string*): *Bucket*

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |

**Returns:** *Bucket*

Defined in: [gcp.ts:39](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L39)

___

### getFile

▸ **getFile**(`urlText`: *string*, `version?`: *string* \| *number*): *File*

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlText` | *string* |
| `version?` | *string* \| *number* |

**Returns:** *File*

Defined in: [gcp.ts:44](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L44)

___

### getFileStatus

▸ **getFileStatus**(`urlText`: *string*, `_getVersion?`: *boolean*): *Promise*<{ `inode`: *number* = 0; `modified`: *any* ; `size`: *any* ; `url`: *string* ; `version`: *any*  }\>

**`inheritdoc`**

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `urlText` | *string* | - |
| `_getVersion` | *boolean* | true |

**Returns:** *Promise*<{ `inode`: *number* = 0; `modified`: *any* ; `size`: *any* ; `url`: *string* ; `version`: *any*  }\>

Overrides: [FileSystem](fs.filesystem.md)

Defined in: [gcp.ts:76](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L76)

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

Defined in: [gcp.ts:89](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L89)

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

Defined in: [gcp.ts:99](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L99)

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

Defined in: [gcp.ts:30](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L30)

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

Defined in: [gcp.ts:133](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L133)

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

Defined in: [gcp.ts:51](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L51)

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

Defined in: [gcp.ts:127](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L127)

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

Defined in: [gcp.ts:147](https://github.com/wholebuzz/fs/blob/master/src/gcp.ts#L147)
