# @wholebuzz/fs

`FileSystem` with atomic primitives enabling multiple readers and writers.

- `LocalFileSystem` employs content hashing to approximate [GCS Object Versioning](https://cloud.google.com/storage/docs/object-versioning). 
- `GoogleCloudFileSystem` provides consistent parallel access paterns.
- `HTTPFileSystem` provides a basic HTTP file system.
- `S3FileSystem` provides basic file system primitives.

# Example

```
import {
  AnyFileSystem,
  GoogleCloudFileSystem,
  HTTPFileSystem,
  LocalFileSystem,
  S3FileSystem
} from '@wholebuzz/fs'
import { readJSON, writeJSON } from '@whilebuzz/fs/lib/json'

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

# CLI

```bash
node lib/cli.js ls .
node lib/cli.js --help
```

## API Reference

### Modules

- [cli](docs/modules/cli.md)
- [fs](docs/modules/fs.md)
- [gcp](docs/modules/gcp.md)
- [http](docs/modules/http.md)
- [json](docs/modules/json.md)
- [s3](docs/modules/s3.md)
- [util](docs/modules/util.md)

### Methods

- [appendToFile](fs.filesystem.md#appendtofile)
- [copyFile](fs.filesystem.md#copyfile)
- [createFile](fs.filesystem.md#createfile)
- [ensureDirectory](fs.filesystem.md#ensuredirectory)
- [fileExists](fs.filesystem.md#fileexists)
- [getFileStatus](fs.filesystem.md#getfilestatus)
- [openReadableFile](fs.filesystem.md#openreadablefile)
- [openWritableFile](fs.filesystem.md#openwritablefile)
- [queueRemoveFile](fs.filesystem.md#queueremovefile)
- [readDirectory](fs.filesystem.md#readdirectory)
- [removeFile](fs.filesystem.md#removefile)
- [replaceFile](fs.filesystem.md#replacefile)

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

Defined in: [fs.ts:158](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L158)

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

Defined in: [fs.ts:133](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L133)

___

### createFile

▸ `Abstract` **createFile**(`urlText`: *string*, `createCallback?`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<boolean\>

Creates file, failing if the file already exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to create. |
| `createCallback?` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for initializing the file. |
| `createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) | Initial metadata. |

**Returns:** *Promise*<boolean\>

Defined in: [fs.ts:110](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L110)

___

### ensureDirectory

▸ `Abstract` **ensureDirectory**(`urlText`: *string*, `mask?`: *number*): *Promise*<boolean\>

Ensures the directory exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the directory. |
| `mask?` | *number* | - |

**Returns:** *Promise*<boolean\>

Defined in: [fs.ts:72](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L72)

___

### fileExists

▸ `Abstract` **fileExists**(`urlText`: *string*): *Promise*<boolean\>

Returns `true` if the file exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to check whether exists. |

**Returns:** *Promise*<boolean\>

Defined in: [fs.ts:78](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L78)

___

### getFileStatus

▸ `Abstract` **getFileStatus**(`urlText`: *string*, `getVersion?`: *boolean*): *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md)\>

Determines the file status. The file version is used to implement atomic mutations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to retrieve the status for. |
| `getVersion?` | *boolean* | - |

**Returns:** *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md)\>

Defined in: [fs.ts:84](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L84)

___

### openReadableFile

▸ `Abstract` **openReadableFile**(`url`: *string*, `version?`: *string* \| *number*): *Promise*<ReadableStreamTree\>

Opens a file for reading.

**`optional`** version Fails if version doesn't match for GCS URLs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL of the file to read from. |
| `version?` | *string* \| *number* | - |

**Returns:** *Promise*<ReadableStreamTree\>

Defined in: [fs.ts:91](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L91)

___

### openWritableFile

▸ `Abstract` **openWritableFile**(`url`: *string*, `version?`: *string* \| *number*, `options?`: [*CreateOptions*](../interfaces/fs.createoptions.md)): *Promise*<WritableStreamTree\>

Opens a file for writing.

**`optional`** version Fails if version doesn't match for GCS URLs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | *string* | The URL of the file to write to. |
| `version?` | *string* \| *number* | - |
| `options?` | [*CreateOptions*](../interfaces/fs.createoptions.md) | - |

**Returns:** *Promise*<WritableStreamTree\>

Defined in: [fs.ts:98](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L98)

___

### queueRemoveFile

▸ `Abstract` **queueRemoveFile**(`urlText`: *string*): *Promise*<boolean\>

Queues deletion, e.g. after DaysSinceCustomTime.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to remove. |

**Returns:** *Promise*<boolean\>

Defined in: [fs.ts:126](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L126)

___

### readDirectory

▸ `Abstract` **readDirectory**(`urlText`: *string*, `prefix?`: *string*): *Promise*<string[]\>

Returns the URLs of the files in a directory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the directory to list files in. |
| `prefix?` | *string* | - |

**Returns:** *Promise*<string[]\>

Defined in: [fs.ts:66](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L66)

___

### removeFile

▸ `Abstract` **removeFile**(`urlText`: *string*): *Promise*<boolean\>

Deletes the file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to remove. |

**Returns:** *Promise*<boolean\>

Defined in: [fs.ts:120](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L120)

___

### replaceFile

▸ `Abstract` **replaceFile**(`urlText`: *string*, `writeCallback`: (`stream`: WritableStreamTree) => *Promise*<boolean\>, `createOptions?`: [*CreateOptions*](../interfaces/fs.createoptions.md), `version?`: *string* \| *number*): *Promise*<boolean\>

Replaces the file, failing if the file version doesn't match.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlText` | *string* | The URL of the file to replace. |
| `writeCallback` | (`stream`: WritableStreamTree) => *Promise*<boolean\> | Stream callback for replacing the file. |
| `createOptions?` | [*CreateOptions*](../interfaces/fs.createoptions.md) | Initial metadata for replaced file. |
| `version?` | *string* \| *number* | The version of the file to replace. |

**Returns:** *Promise*<boolean\>

Defined in: [fs.ts:142](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L142)
[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / json

# Module: json

## Table of contents

### Variables

- [JSONStream](json.md#jsonstream)

### Functions

- [mapLines](json.md#maplines)
- [mapLinesWithHeader](json.md#maplineswithheader)
- [parseJSON](json.md#parsejson)
- [parseJSONLines](json.md#parsejsonlines)
- [parseLines](json.md#parselines)
- [pipeFilter](json.md#pipefilter)
- [pipeFromFilter](json.md#pipefromfilter)
- [pipeJSONFormatter](json.md#pipejsonformatter)
- [pipeJSONLinesFormatter](json.md#pipejsonlinesformatter)
- [pipeJSONLinesParser](json.md#pipejsonlinesparser)
- [pipeJSONParser](json.md#pipejsonparser)
- [readJSON](json.md#readjson)
- [readJSONHashed](json.md#readjsonhashed)
- [readJSONLines](json.md#readjsonlines)
- [readLines](json.md#readlines)
- [readLinesWithHeader](json.md#readlineswithheader)
- [serializeJSON](json.md#serializejson)
- [serializeJSONLines](json.md#serializejsonlines)
- [writeContent](json.md#writecontent)
- [writeJSON](json.md#writejson)
- [writeJSONLines](json.md#writejsonlines)
- [writeShardedJSONLines](json.md#writeshardedjsonlines)

## Variables

### JSONStream

• `Const` **JSONStream**: *any*

Defined in: [json.ts:19](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L19)

## Functions

### mapLines

▸ **mapLines**<X\>(`stream`: ReadableStreamTree, `map`: (`x`: *string*) => X): *Promise*<X[]\>

Maps lines from [[stream]].  Used to implement [readLines](json.md#readlines).

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | ReadableStreamTree | The stream to read lines from. |
| `map` | (`x`: *string*) => X | - |

**Returns:** *Promise*<X[]\>

Defined in: [json.ts:148](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L148)

___

### mapLinesWithHeader

▸ **mapLinesWithHeader**<X, H\>(`stream`: ReadableStreamTree, `map`: (`x`: *string*) => X, `header?`: (`y`: *string*) => H, `ret?`: X[]): *Promise*<[H \| *undefined*, X[]]\>

Parses lines (with header) from [[stream]].  Used to implement [readLinesWithHeader](json.md#readlineswithheader).

#### Type parameters

| Name |
| :------ |
| `X` |
| `H` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `stream` | ReadableStreamTree | - | The stream to read lines from. |
| `map` | (`x`: *string*) => X | - | - |
| `header?` | (`y`: *string*) => H | - | - |
| `ret` | X[] | [] | - |

**Returns:** *Promise*<[H \| *undefined*, X[]]\>

Defined in: [json.ts:158](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L158)

___

### parseJSON

▸ **parseJSON**(`stream`: ReadableStreamTree): *Promise*<unknown\>

Parses JSON object from [[stream]].  Used to implement [readJSON](json.md#readjson).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | ReadableStreamTree | The stream to read a JSON object from. |

**Returns:** *Promise*<unknown\>

Defined in: [json.ts:186](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L186)

___

### parseJSONLines

▸ **parseJSONLines**(`stream`: ReadableStreamTree): *Promise*<unknown[]\>

Parses JSON object from [[stream]].  Used to implement [readJSON](json.md#readjson).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | ReadableStreamTree | The stream to read a JSON object from. |

**Returns:** *Promise*<unknown[]\>

Defined in: [json.ts:203](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L203)

___

### parseLines

▸ **parseLines**(`stream`: ReadableStreamTree, `callback`: (`x`: *string*) => *void*): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |
| `callback` | (`x`: *string*) => *void* |

**Returns:** *Promise*<void\>

Defined in: [json.ts:132](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L132)

___

### pipeFilter

▸ **pipeFilter**(`stream`: ReadableStreamTree, `filter`: (`x`: *any*) => *any*): ReadableStreamTree

Create filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |
| `filter` | (`x`: *any*) => *any* |

**Returns:** ReadableStreamTree

Defined in: [json.ts:280](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L280)

___

### pipeFromFilter

▸ **pipeFromFilter**(`stream`: WritableStreamTree, `filter`: (`x`: *any*) => *any*): WritableStreamTree

Create filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |
| `filter` | (`x`: *any*) => *any* |

**Returns:** WritableStreamTree

Defined in: [json.ts:292](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L292)

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

Defined in: [json.ts:258](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L258)

___

### pipeJSONLinesFormatter

▸ **pipeJSONLinesFormatter**(`stream`: WritableStreamTree): WritableStreamTree

Create JSON-lines formatter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |

**Returns:** WritableStreamTree

Defined in: [json.ts:273](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L273)

___

### pipeJSONLinesParser

▸ **pipeJSONLinesParser**(`stream`: ReadableStreamTree): ReadableStreamTree

Create JSON parser stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |

**Returns:** ReadableStreamTree

Defined in: [json.ts:250](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L250)

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

Defined in: [json.ts:241](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L241)

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

Defined in: [json.ts:54](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L54)

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

Defined in: [json.ts:62](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L62)

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

Defined in: [json.ts:72](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L72)

___

### readLines

▸ **readLines**<X\>(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `map`: (`x`: *string*) => X): *Promise*<X[]\>

Reads every line from a file.

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to read lines from. |
| `map` | (`x`: *string*) => X | Callback called for each line. |

**Returns:** *Promise*<X[]\>

Defined in: [json.ts:26](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L26)

___

### readLinesWithHeader

▸ **readLinesWithHeader**<X, H\>(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `map`: (`x`: *string*) => X, `header?`: (`x`: *string*) => H, `ret?`: X[]): *Promise*<[H \| *undefined*, X[]]\>

Reads every line from a file, treating the first line as a header.

#### Type parameters

| Name |
| :------ |
| `X` |
| `H` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - | - |
| `url` | *string* | - | The URL of the file to read lines from. |
| `map` | (`x`: *string*) => X | - | Callback called for every line succeeding the header. |
| `header?` | (`x`: *string*) => H | - | Callback called for the first line. |
| `ret` | X[] | [] | - |

**Returns:** *Promise*<[H \| *undefined*, X[]]\>

Defined in: [json.ts:40](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L40)

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

Defined in: [json.ts:219](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L219)

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

Defined in: [json.ts:234](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L234)

___

### writeContent

▸ **writeContent**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `value`: *string*): *Promise*<void\>

Writes the string to a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to serialize the string to. |
| `value` | *string* | The string to serialize. |

**Returns:** *Promise*<void\>

Defined in: [json.ts:81](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L81)

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

Defined in: [json.ts:95](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L95)

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

Defined in: [json.ts:104](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L104)

___

### writeShardedJSONLines

▸ **writeShardedJSONLines**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `obj`: *object*[], `shards`: *number*, `shardFunction?`: (`x`: *object*, `modulus`: *number*) => *number*): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |
| `obj` | *object*[] |
| `shards` | *number* |
| `shardFunction` | (`x`: *object*, `modulus`: *number*) => *number* |

**Returns:** *Promise*<void\>

Defined in: [json.ts:108](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L108)
