[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / json

# Module: json

## Table of contents

### Functions

- [createJSONFormatter](json.md#createjsonformatter)
- [mapLines](json.md#maplines)
- [mapLinesWithHeader](json.md#maplineswithheader)
- [parseJSON](json.md#parsejson)
- [parseLines](json.md#parselines)
- [readJSON](json.md#readjson)
- [readJSONHashed](json.md#readjsonhashed)
- [readLines](json.md#readlines)
- [readLinesWithHeader](json.md#readlineswithheader)
- [serializeJSON](json.md#serializejson)
- [serializeJSONStream](json.md#serializejsonstream)
- [writeContent](json.md#writecontent)
- [writeJSON](json.md#writejson)
- [writeJSONLines](json.md#writejsonlines)
- [writeShardedJSONLines](json.md#writeshardedjsonlines)

## Functions

### createJSONFormatter

▸ **createJSONFormatter**(`isArray`: *boolean*): Duplex

Create JSON formatter stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `isArray` | *boolean* | Accept array objects or property tuples. |

**Returns:** Duplex

Defined in: [json.ts:231](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L231)

___

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

### readJSON

▸ **readJSON**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *Promise*<unknown\>

Reads a serialized JSON object or array from a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to parse a JSON object or array from. |

**Returns:** *Promise*<unknown\>

Defined in: [json.ts:49](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L49)

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

Defined in: [json.ts:57](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L57)

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

Defined in: [json.ts:21](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L21)

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

Defined in: [json.ts:35](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L35)

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

Defined in: [json.ts:204](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L204)

___

### serializeJSONStream

▸ **serializeJSONStream**(`stream`: WritableStreamTree, `readable`: Readable, `isArray`: *boolean*): *Promise*<boolean\>

Serializes [[readable]] to [[stream]].  Used to implement [writeJSON](json.md#writejson).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | WritableStreamTree | The stream to write a JSON object to. |
| `readable` | Readable | - |
| `isArray` | *boolean* | - |

**Returns:** *Promise*<boolean\>

Defined in: [json.ts:219](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L219)

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

Defined in: [json.ts:68](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L68)

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

Defined in: [json.ts:82](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L82)

___

### writeJSONLines

▸ **writeJSONLines**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `obj`: *object*[]): *Promise*<void\>

Serializes array to a JSON Lines file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to serialize a JSON array to. |
| `obj` | *object*[] | - |

**Returns:** *Promise*<void\>

Defined in: [json.ts:91](https://github.com/wholebuzz/fs/blob/master/src/json.ts#L91)

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
