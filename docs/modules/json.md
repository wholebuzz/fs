[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / json

# Module: json

## Table of contents

### Variables

- [JSONStream](json.md#jsonstream)

### Functions

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

Defined in: [src/json.ts:92](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L92)

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

Defined in: [src/json.ts:150](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L150)

___

### pipeJSONLinesFormatter

▸ **pipeJSONLinesFormatter**(`stream`: WritableStreamTree): WritableStreamTree

Create JSON-lines formatter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |

**Returns:** WritableStreamTree

Defined in: [src/json.ts:165](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L165)

___

### pipeJSONLinesParser

▸ **pipeJSONLinesParser**(`stream`: ReadableStreamTree): ReadableStreamTree

Create JSON parser stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |

**Returns:** ReadableStreamTree

Defined in: [src/json.ts:142](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L142)

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

Defined in: [src/json.ts:133](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L133)

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

Defined in: [src/json.ts:111](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L111)

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

Defined in: [src/json.ts:126](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L126)

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
