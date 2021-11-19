[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / parquet

# Module: parquet

## Table of contents

### Functions

- [newParquetEnvelopeReader](parquet.md#newparquetenvelopereader)
- [newParquetReader](parquet.md#newparquetreader)
- [openParquetFile](parquet.md#openparquetfile)
- [pipeParquetFormatter](parquet.md#pipeparquetformatter)

## Functions

### newParquetEnvelopeReader

▸ **newParquetEnvelopeReader**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *ParquetEnvelopeReader*

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |

**Returns:** *ParquetEnvelopeReader*

Defined in: [src/parquet.ts:34](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L34)

___

### newParquetReader

▸ **newParquetReader**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *Promise*<any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |

**Returns:** *Promise*<any\>

Defined in: [src/parquet.ts:29](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L29)

___

### openParquetFile

▸ **openParquetFile**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `columnList?`: *string*[][] \| *string*[]): *Promise*<ReadableStreamTree\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |
| `columnList?` | *string*[][] \| *string*[] |

**Returns:** *Promise*<ReadableStreamTree\>

Defined in: [src/parquet.ts:8](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L8)

___

### pipeParquetFormatter

▸ **pipeParquetFormatter**(`stream`: WritableStreamTree, `schema`: ParquetSchema): WritableStreamTree

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |
| `schema` | ParquetSchema |

**Returns:** WritableStreamTree

Defined in: [src/parquet.ts:46](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L46)
