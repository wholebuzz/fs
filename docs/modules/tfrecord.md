[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / tfrecord

# Module: tfrecord

## Table of contents

### Classes

- [Reader](../classes/tfrecord.reader.md)
- [Writer](../classes/tfrecord.writer.md)

### Type aliases

- [Example](tfrecord.md#example)

### Variables

- [Example](tfrecord.md#example)

### Functions

- [appendTfRecord](tfrecord.md#appendtfrecord)
- [createBinaryRecordReader](tfrecord.md#createbinaryrecordreader)
- [createBinaryRecordWriter](tfrecord.md#createbinaryrecordwriter)
- [makeTfExample](tfrecord.md#maketfexample)
- [parseTfExample](tfrecord.md#parsetfexample)
- [pipeTfRecordFormatter](tfrecord.md#pipetfrecordformatter)
- [pipeTfRecordParser](tfrecord.md#pipetfrecordparser)

## Type aliases

### Example

Ƭ **Example**: tensorflow.Example

Defined in: node_modules/tfrecord-stream/lib/index.d.ts:4

## Variables

### Example

• `Const` **Example**: *typeof* tensorflow.Example

Defined in: node_modules/tfrecord-stream/lib/index.d.ts:3

## Functions

### appendTfRecord

▸ **appendTfRecord**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `urlText`: *string*, `record`: *Record*<string, any\>): *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md) \| ``null``\>

Appends a record to a .tfrecord file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `urlText` | *string* |
| `record` | *Record*<string, any\> |

**Returns:** *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md) \| ``null``\>

Defined in: [src/tfrecord.ts:75](https://github.com/wholebuzz/fs/blob/master/src/tfrecord.ts#L75)

___

### createBinaryRecordReader

▸ **createBinaryRecordReader**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *Promise*<RecordReader\>

Creates a .tfrecord file reader using arbitrary buffers instead of protobuf.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file.tfbinary to read records from. |

**Returns:** *Promise*<RecordReader\>

Defined in: [src/tfrecord.ts:15](https://github.com/wholebuzz/fs/blob/master/src/tfrecord.ts#L15)

___

### createBinaryRecordWriter

▸ **createBinaryRecordWriter**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *Promise*<RecordWriter\>

Creates a .tfrecord file writer using arbitrary buffers instead of protobuf.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file.tfbinary to read records from. |

**Returns:** *Promise*<RecordWriter\>

Defined in: [src/tfrecord.ts:23](https://github.com/wholebuzz/fs/blob/master/src/tfrecord.ts#L23)

___

### makeTfExample

▸ **makeTfExample**(`record`: *Record*<string, any\>, `floatSuffix?`: *string*): [*Example*](tfrecord.md#example)

Creates a TF [Example](tfrecord.md#example) from a dictionary.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `record` | *Record*<string, any\> | - | The object to serialize. |
| `floatSuffix` | *string* | '\_float' | Key suffix indicating floating point data. |

**Returns:** [*Example*](tfrecord.md#example)

Defined in: [src/tfrecord.ts:114](https://github.com/wholebuzz/fs/blob/master/src/tfrecord.ts#L114)

___

### parseTfExample

▸ **parseTfExample**(`example`: [*Example*](tfrecord.md#example)): *Record*<string, any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `example` | [*Example*](tfrecord.md#example) |

**Returns:** *Record*<string, any\>

Defined in: [src/tfrecord.ts:91](https://github.com/wholebuzz/fs/blob/master/src/tfrecord.ts#L91)

___

### pipeTfRecordFormatter

▸ **pipeTfRecordFormatter**(`stream`: WritableStreamTree, `format?`: (`x`: *Record*<string, any\>) => [*Example*](tfrecord.md#example)): *Promise*<WritableStreamTree\>

Create tfrecord writer stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |
| `format` | (`x`: *Record*<string, any\>) => [*Example*](tfrecord.md#example) |

**Returns:** *Promise*<WritableStreamTree\>

Defined in: [src/tfrecord.ts:53](https://github.com/wholebuzz/fs/blob/master/src/tfrecord.ts#L53)

___

### pipeTfRecordParser

▸ **pipeTfRecordParser**(`stream`: ReadableStreamTree, `parse?`: (`x`: [*Example*](tfrecord.md#example)) => *Record*<string, any\>): *Promise*<ReadableStreamTree\>

Reads records from .tfrecord file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | ReadableStreamTree | Readable stream of the file.tfrecord to read records from. |
| `parse` | (`x`: [*Example*](tfrecord.md#example)) => *Record*<string, any\> | - |

**Returns:** *Promise*<ReadableStreamTree\>

Defined in: [src/tfrecord.ts:31](https://github.com/wholebuzz/fs/blob/master/src/tfrecord.ts#L31)
