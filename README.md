# @wholebuzz/fs [![image](https://img.shields.io/npm/v/@wholebuzz/fs)](https://www.npmjs.com/package/@wholebuzz/fs) [![test](https://github.com/wholebuzz/fs/actions/workflows/test.yaml/badge.svg)](https://github.com/wholebuzz/fs/actions/workflows/test.yaml)

File system abstraction with implementations for GCP GCS, AWS S3, Azure, SMB, HTTP, and Local file systems. Provides atomic primitives enabling multiple readers and writers.

- [LocalFileSystem](src/local.ts) employs content hashing to approximate [GCS Object Versioning](https://cloud.google.com/storage/docs/object-versioning). 
- [GoogleCloudFileSystem](src/gcp.ts) provides consistent parallel access paterns.
- [S3FileSystem](src/s3.ts) provides basic file system primitives.
- [SMBFileSystem](src/smb.ts) provides basic file system primitives.
- [HTTPFileSystem](src/http.ts) provides a basic HTTP file system.

Provides file format implementations for:

- [Lines](src/lines.ts)
- [CSV](src/csv.ts) (via [csv](https://www.npmjs.com/package/csv))
- [JSON, ND-JSON / JSONL](src/json.ts) (via [JSONStream](https://www.npmjs.com/package/JSONStream) and [ndjson](https://www.npmjs.com/package/ndjson))
- [Parquet](src/parquet.ts) including `streamingParquet` codec and [parquetjs](https://www.npmjs.com/package/@entitycs/parquetjs-micro).
- [TFRecord](src/tfrecord.ts) including [tfrecord-stream](https://www.npmjs.com/package/tfrecord-stream).

Additionally provides sharding & merging utilities.

## Dependencies

The `FileSystem` implementations require peer dependencies:

- AnyFileSystem: None. URL resolution as a `FileSystem`. Files have URLs and HTTP is a file system.
- AzureBlobStorageFileSystem: `@azure/storage-blob` and `@azure/identity`
- AzureFileShareFileSystem: `@azure/storage-file-share`
- GoogleCloudFileSystem: `@google-cloud/storage`
- HTTPFileSystem: `axios`
- LocalFileSystem: `fs-ext`, `glob`, and `glob-stream`
- S3FileSystem: `aws-sdk`, `s3-stream-upload`, and `athena-express`
- SMBFileSystem: `@marsaud/smb2`

## Credits

Built with the [tree-stream](https://www.npmjs.com/package/tree-stream) primitives `ReadableStreamTree` and `WritableStreamTree`.

## Project history

The project started to support [@wholebuzz/archive](https://www.npmjs.com/package/@wholebuzz/archive), a terabyte-scale archive for GCS.
The focus has since expanded to include powering [dbcp](https://www.npmjs.com/package/dbcp) and [@wholebuzz/mapreduce](https://www.npmjs.com/package/@wholebuzz/mapreduce) with a collection of file system implementations under a common interface.
The atomic primitives are only available for Google Cloud Storage and local.

## Example

```typescript
import { AnyFileSystem } from '@wholebuzz/fs/lib/fs'
import { GoogleCloudFileSystem } from '@wholebuzz/fs/lib/gcp'
import { HTTPFileSystem } from '@wholebuzz/fs/lib/http'
import { LocalFileSystem } from '@wholebuzz/fs/lib/local'
import { S3FileSystem } from '@wholebuzz/fs/lib/s3'
import { readJSON, writeJSON } from '@wholebuzz/fs/lib/json'

const httpFileSystem = new HTTPFileSystem()
const fs = new AnyFileSystem([
  { urlPrefix: 'gs://', fs: new GoogleCloudFileSystem() },
  { urlPrefix: 's3://', fs: new S3FileSystem() },
  { urlPrefix: 'http://', fs: httpFileSystem },
  { urlPrefix: 'https://', fs: httpFileSystem },
  { urlPrefix: '', fs: new LocalFileSystem() },
])

await writeJSON(fs, 's3://bucket/file', { foo: 'bar' })
const foobar = await readJSON(fs, 's3://bucket/file')
```

## CLI

```bash
node lib/cli.js ls .
node lib/cli.js --help
```

## API Reference

### Modules

- [azure-blob](docs/modules/azure_blob.md)
- [cli](docs/modules/cli.md)
- [csv](docs/modules/csv.md)
- [fs](docs/modules/fs.md)
- [gcp](docs/modules/gcp.md)
- [http](docs/modules/http.md)
- [json](docs/modules/json.md)
- [lines](docs/modules/lines.md)
- [local](docs/modules/local.md)
- [merge](docs/modules/merge.md)
- [parquet](docs/modules/parquet.md)
- [s3](docs/modules/s3.md)
- [smb](docs/modules/smb.md)
- [stream](docs/modules/stream.md)
- [tfrecord](docs/modules/tfrecord.md)
- [util](docs/modules/util.md)

### Methods

- [appendToFile](fs.filesystem.md#appendtofile)
- [copyFile](fs.filesystem.md#copyfile)
- [createFile](fs.filesystem.md#createfile)
- [ensureDirectory](fs.filesystem.md#ensuredirectory)
- [fileExists](fs.filesystem.md#fileexists)
- [getFileStatus](fs.filesystem.md#getfilestatus)
- [moveFile](fs.filesystem.md#movefile)
- [openReadableFile](fs.filesystem.md#openreadablefile)
- [openWritableFile](fs.filesystem.md#openwritablefile)
- [queueRemoveFile](fs.filesystem.md#queueremovefile)
- [readDirectory](fs.filesystem.md#readdirectory)
- [readDirectoryStream](fs.filesystem.md#readdirectorystream)
- [removeDirectory](fs.filesystem.md#removedirectory)
- [removeFile](fs.filesystem.md#removefile)
- [replaceFile](fs.filesystem.md#replacefile)

## Constructors

### constructor

\+ **new FileSystem**(): [*FileSystem*](fs.filesystem.md)

**Returns:** [*FileSystem*](fs.filesystem.md)

## Methods

### appendToFile

▸ `Abstract` **appendToFile**(`urlText`: *string*, `writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createCallback?`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md), `appendOptions?`: [*AppendOptions*](../interfaces/fs.appendoptions.md)): *Promise*<``null`` \| [*FileStatus*](../interfaces/fs.filestatus.md)\>

Appends to the file, safely.  Either `writeCallback` or `createCallback` is called.
For simple appends, the same paramter can be supplied for both `writeCallback` and
`createCallback`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to append to. |
| `writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for appending to the file. |
| `createCallback?` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for initializing the file, if necessary. |
| `createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) | Initial metadata for initializing the file, if necessary. |
| `appendOptions?` | [*AppendOptions*](../interfaces/fs.appendoptions.md) | - |

**Returns:** *Promise*<``null`` \| [*FileStatus*](../interfaces/fs.filestatus.md)\>

Defined in: [src/fs.ts:209](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L209)

___

### copyFile

▸ `Abstract` **copyFile**(`sourceUrlText`: *string*, `destUrlText`: *string*): *Promise*<boolean\>

Copies the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sourceUrlText` | *string* | The URL of the source file to copy. |
| `destUrlText` | *string* | The destination URL to copy the file to. |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:178](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L178)

___

### createFile

▸ `Abstract` **createFile**(`urlText`: *string*, `createCallback?`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `options?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<boolean\>

Creates file, failing if the file already exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to create. |
| `createCallback?` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for initializing the file. |
| `options?` | [*CreateOptions*](../interfaces/fs.createoptions.md) | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:155](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L155)

___

### ensureDirectory

▸ `Abstract` **ensureDirectory**(`urlText`: *string*, `options?`: [*EnsureDirectoryOptions*](../interfaces/fs.ensuredirectoryoptions.md)): *Promise*<boolean\>

Ensures the directory exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the directory. |
| `options?` | [*EnsureDirectoryOptions*](../interfaces/fs.ensuredirectoryoptions.md) | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:109](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L109)

___

### fileExists

▸ `Abstract` **fileExists**(`urlText`: *string*): *Promise*<boolean\>

Returns `true` if the file exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to check whether exists. |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:121](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L121)

___

### getFileStatus

▸ `Abstract` **getFileStatus**(`urlText`: *string*, `options?`: [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md)): *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md)\>

Determines the file status. The file version is used to implement atomic mutations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to retrieve the status for. |
| `options?` | [*GetFileStatusOptions*](../interfaces/fs.getfilestatusoptions.md) | - |

**Returns:** *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md)\>

Defined in: [src/fs.ts:127](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L127)

___

### moveFile

▸ `Abstract` **moveFile**(`sourceUrlText`: *string*, `destUrlText`: *string*): *Promise*<boolean\>

Moves the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sourceUrlText` | *string* | The URL of the source file to copy. |
| `destUrlText` | *string* | The destination URL to copy the file to. |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:185](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L185)

___

### openReadableFile

▸ `Abstract` **openReadableFile**(`url`: *string*, `options?`: [*OpenReadableFileOptions*](../interfaces/fs.openreadablefileoptions.md)): *Promise*<ReadableStreamTree\>

Opens a file for reading.

**`optional`** version Fails if version doesn't match for GCS URLs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL of the file to read from. |
| `options?` | [*OpenReadableFileOptions*](../interfaces/fs.openreadablefileoptions.md) | - |

**Returns:** *Promise*<ReadableStreamTree\>

Defined in: [src/fs.ts:134](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L134)

___

### openWritableFile

▸ `Abstract` **openWritableFile**(`url`: *string*, `options?`: [*OpenWritableFileOptions*](../interfaces/fs.openwritablefileoptions.md)): *Promise*<WritableStreamTree\>

Opens a file for writing.

**`optional`** version Fails if version doesn't match for GCS URLs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL of the file to write to. |
| `options?` | [*OpenWritableFileOptions*](../interfaces/fs.openwritablefileoptions.md) | - |

**Returns:** *Promise*<WritableStreamTree\>

Defined in: [src/fs.ts:144](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L144)

___

### queueRemoveFile

▸ `Abstract` **queueRemoveFile**(`urlText`: *string*): *Promise*<boolean\>

Queues deletion, e.g. after DaysSinceCustomTime.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to remove. |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:171](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L171)

___

### readDirectory

▸ `Abstract` **readDirectory**(`urlText`: *string*, `options?`: [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md)): *Promise*<[*DirectoryEntry*](../interfaces/fs.directoryentry.md)[]\>

Returns the URLs of the files in a directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the directory to list files in. |
| `options?` | [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md) | - |

**Returns:** *Promise*<[*DirectoryEntry*](../interfaces/fs.directoryentry.md)[]\>

Defined in: [src/fs.ts:94](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L94)

___

### readDirectoryStream

▸ `Abstract` **readDirectoryStream**(`urlText`: *string*, `options?`: [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md)): *Promise*<ReadableStreamTree\>

Returns a stream of the URLs of the files in a directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the directory to list files in. |
| `options?` | [*ReadDirectoryOptions*](../interfaces/fs.readdirectoryoptions.md) | - |

**Returns:** *Promise*<ReadableStreamTree\>

Defined in: [src/fs.ts:100](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L100)

___

### removeDirectory

▸ `Abstract` **removeDirectory**(`urlText`: *string*, `options?`: [*RemoveDirectoryOptions*](../interfaces/fs.removedirectoryoptions.md)): *Promise*<boolean\>

Removes the directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the directory. |
| `options?` | [*RemoveDirectoryOptions*](../interfaces/fs.removedirectoryoptions.md) | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:115](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L115)

___

### removeFile

▸ `Abstract` **removeFile**(`urlText`: *string*): *Promise*<boolean\>

Deletes the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to remove. |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:165](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L165)

___

### replaceFile

▸ `Abstract` **replaceFile**(`urlText`: *string*, `writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `options?`: [*ReplaceFileOptions*](../interfaces/fs.replacefileoptions.md)): *Promise*<boolean\>

Replaces the file, failing if the file version doesn't match.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to replace. |
| `writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for replacing the file. |
| `options?` | [*ReplaceFileOptions*](../interfaces/fs.replacefileoptions.md) | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/fs.ts:194](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L194)
[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / json

# Module: json

## Table of contents

### Variables

- [JSONStream](json.md#jsonstream)

### Functions

- [newJSONLinesFormatter](json.md#newjsonlinesformatter)
- [newJSONLinesParser](json.md#newjsonlinesparser)
- [parseJSON](json.md#parsejson)
- [parseJSONLines](json.md#parsejsonlines)
- [pipeJSONFormatter](json.md#pipejsonformatter)
- [pipeJSONLinesFormatter](json.md#pipejsonlinesformatter)
- [pipeJSONLinesParser](json.md#pipejsonlinesparser)
- [pipeJSONParser](json.md#pipejsonparser)
- [readJSON](json.md#readjson)
- [readJSONHashed](json.md#readjsonhashed)
- [readJSONLines](json.md#readjsonlines)
- [serializeJSON](json.md#serializejson)
- [serializeJSONLines](json.md#serializejsonlines)
- [writeJSON](json.md#writejson)
- [writeJSONLines](json.md#writejsonlines)
- [writeShardedJSONLines](json.md#writeshardedjsonlines)

## Variables

### JSONStream

• `Const` **JSONStream**: *any*

Defined in: [src/json.ts:11](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L11)

## Functions

### newJSONLinesFormatter

▸ `Const` **newJSONLinesFormatter**(): *Transform*

**Returns:** *Transform*

Defined in: [src/json.ts:146](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L146)

___

### newJSONLinesParser

▸ `Const` **newJSONLinesParser**(): *ThroughStream*

**Returns:** *ThroughStream*

Defined in: [src/json.ts:147](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L147)

___

### parseJSON

▸ **parseJSON**(`stream`: ReadableStreamTree): *Promise*<unknown\>

Parses JSON object from [[stream]].  Used to implement [readJSON](json.md#readjson).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | ReadableStreamTree | The stream to read a JSON object from. |

**Returns:** *Promise*<unknown\>

Defined in: [src/json.ts:72](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L72)

___

### parseJSONLines

▸ **parseJSONLines**(`stream`: ReadableStreamTree): *Promise*<unknown[]\>

Parses JSON object from [[stream]].  Used to implement [readJSON](json.md#readjson).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | ReadableStreamTree | The stream to read a JSON object from. |

**Returns:** *Promise*<unknown[]\>

Defined in: [src/json.ts:80](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L80)

___

### pipeJSONFormatter

▸ **pipeJSONFormatter**(`stream`: WritableStreamTree, `isArray`: *boolean*): WritableStreamTree

Create JSON formatter stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | WritableStreamTree | - |
| `isArray` | *boolean* | Accept array objects or property tuples. |

**Returns:** WritableStreamTree

Defined in: [src/json.ts:127](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L127)

___

### pipeJSONLinesFormatter

▸ **pipeJSONLinesFormatter**(`stream`: WritableStreamTree): WritableStreamTree

Create JSON-lines formatter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |

**Returns:** WritableStreamTree

Defined in: [src/json.ts:142](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L142)

___

### pipeJSONLinesParser

▸ **pipeJSONLinesParser**(`stream`: ReadableStreamTree): ReadableStreamTree

Create JSON parser stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |

**Returns:** ReadableStreamTree

Defined in: [src/json.ts:119](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L119)

___

### pipeJSONParser

▸ **pipeJSONParser**(`stream`: ReadableStreamTree, `isArray`: *boolean*): ReadableStreamTree

Create JSON parser stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |
| `isArray` | *boolean* |

**Returns:** ReadableStreamTree

Defined in: [src/json.ts:110](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L110)

___

### readJSON

▸ **readJSON**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *Promise*<unknown\>

Reads a serialized JSON object or array from a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to parse a JSON object or array from. |

**Returns:** *Promise*<unknown\>

Defined in: [src/json.ts:17](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L17)

___

### readJSONHashed

▸ **readJSONHashed**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *Promise*<[*unknown*, ``null`` \| *string*]\>

Reads a serialized JSON object from a file, and also hashes the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to parse a JSON object from. |

**Returns:** *Promise*<[*unknown*, ``null`` \| *string*]\>

Defined in: [src/json.ts:25](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L25)

___

### readJSONLines

▸ **readJSONLines**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *Promise*<unknown[]\>

Reads a serialized JSON-lines array from a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to parse a JSON object or array from. |

**Returns:** *Promise*<unknown[]\>

Defined in: [src/json.ts:35](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L35)

___

### serializeJSON

▸ **serializeJSON**(`stream`: WritableStreamTree, `obj`: *object* \| *any*[]): *Promise*<boolean\>

Serializes JSON object to [[stream]].  Used to implement [writeJSON](json.md#writejson).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | WritableStreamTree | The stream to write a JSON object to. |
| `obj` | *object* \| *any*[] | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/json.ts:88](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L88)

___

### serializeJSONLines

▸ **serializeJSONLines**(`stream`: WritableStreamTree, `obj`: *any*[]): *Promise*<boolean\>

Serializes JSON object to [[stream]].  Used to implement [writeJSONLines](json.md#writejsonlines).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | WritableStreamTree | The stream to write a JSON object to. |
| `obj` | *any*[] | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/json.ts:103](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L103)

___

### writeJSON

▸ **writeJSON**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `value`: *object* \| *any*[]): *Promise*<boolean\>

Serializes object or array to a JSON file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to serialize a JSON object or array to. |
| `value` | *object* \| *any*[] | The object or array to serialize. |

**Returns:** *Promise*<boolean\>

Defined in: [src/json.ts:44](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L44)

___

### writeJSONLines

▸ **writeJSONLines**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `obj`: *object*[]): *Promise*<boolean\>

Serializes array to a JSON Lines file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to serialize a JSON array to. |
| `obj` | *object*[] | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/json.ts:53](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L53)

___

### writeShardedJSONLines

▸ **writeShardedJSONLines**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `obj`: *object*[], `shards`: *number*, `shardFunction?`: (`x`: *object*, `modulus`: *number*) => *number*): *Promise*<boolean\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |
| `obj` | *object*[] |
| `shards` | *number* |
| `shardFunction` | (`x`: *object*, `modulus`: *number*) => *number* |

**Returns:** *Promise*<boolean\>

Defined in: [src/json.ts:57](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L57)
