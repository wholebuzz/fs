[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / csv

# Module: csv

## Table of contents

### Functions

- [parseCSV](csv.md#parsecsv)
- [pipeCSVFormatter](csv.md#pipecsvformatter)
- [pipeCSVParser](csv.md#pipecsvparser)
- [readCSV](csv.md#readcsv)
- [serializeCSV](csv.md#serializecsv)
- [writeCSV](csv.md#writecsv)

## Functions

### parseCSV

▸ **parseCSV**(`stream`: ReadableStreamTree, `options?`: CSVParseOptions): *Promise*<unknown[]\>

Parses CSV from [[stream]].  Used to implement [readCSV](csv.md#readcsv).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | ReadableStreamTree | The stream to read a CSV object from. |
| `options?` | CSVParseOptions | - |

**Returns:** *Promise*<unknown[]\>

Defined in: [src/csv.ts:33](https://github.com/wholebuzz/fs/blob/master/src/csv.ts#L33)

___

### pipeCSVFormatter

▸ **pipeCSVFormatter**(`stream`: WritableStreamTree, `options?`: CSVFormatOptions): WritableStreamTree

Create CSV formatter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |
| `options?` | CSVFormatOptions |

**Returns:** WritableStreamTree

Defined in: [src/csv.ts:22](https://github.com/wholebuzz/fs/blob/master/src/csv.ts#L22)

___

### pipeCSVParser

▸ **pipeCSVParser**(`stream`: ReadableStreamTree, `options?`: CSVParseOptions): ReadableStreamTree

Create CSV parser stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |
| `options?` | CSVParseOptions |

**Returns:** ReadableStreamTree

Defined in: [src/csv.ts:12](https://github.com/wholebuzz/fs/blob/master/src/csv.ts#L12)

___

### readCSV

▸ **readCSV**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `options?`: CSVParseOptions): *Promise*<unknown[]\>

Reads a serialized JSON object or array from a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to parse a JSON object or array from. |
| `options?` | CSVParseOptions | - |

**Returns:** *Promise*<unknown[]\>

Defined in: [src/csv.ts:41](https://github.com/wholebuzz/fs/blob/master/src/csv.ts#L41)

___

### serializeCSV

▸ **serializeCSV**(`stream`: WritableStreamTree, `obj`: *any*[], `options?`: CSVFormatOptions): *Promise*<boolean\>

Serializes CSV object to [[stream]].  Used to implement [writeCSV](csv.md#writecsv).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | WritableStreamTree | The stream to write a CSV object to. |
| `obj` | *any*[] | - |
| `options?` | CSVFormatOptions | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/csv.ts:49](https://github.com/wholebuzz/fs/blob/master/src/csv.ts#L49)

___

### writeCSV

▸ **writeCSV**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `value`: *any*[], `options?`: CSVFormatOptions): *Promise*<boolean\>

Serializes object or array to a CSV file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to serialize a CSV object or array to. |
| `value` | *any*[] | The object or array to serialize. |
| `options?` | CSVFormatOptions | - |

**Returns:** *Promise*<boolean\>

Defined in: [src/csv.ts:66](https://github.com/wholebuzz/fs/blob/master/src/csv.ts#L66)
