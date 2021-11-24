[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / parquet

# Module: parquet

## Table of contents

### Interfaces

- [OpenParquetFileOptions](../interfaces/parquet.openparquetfileoptions.md)

### Functions

- [newParquetEnvelopeReader](parquet.md#newparquetenvelopereader)
- [newParquetReader](parquet.md#newparquetreader)
- [openParquetFile](parquet.md#openparquetfile)
- [openParquetFiles](parquet.md#openparquetfiles)
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

Defined in: [src/parquet.ts:54](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L54)

___

### newParquetReader

▸ **newParquetReader**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *Promise*<any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |

**Returns:** *Promise*<any\>

Defined in: [src/parquet.ts:49](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L49)

___

### openParquetFile

▸ **openParquetFile**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `options?`: [*OpenParquetFileOptions*](../interfaces/parquet.openparquetfileoptions.md)): *Promise*<ReadableStreamTree\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |
| `options?` | [*OpenParquetFileOptions*](../interfaces/parquet.openparquetfileoptions.md) |

**Returns:** *Promise*<ReadableStreamTree\>

Defined in: [src/parquet.ts:28](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L28)

___

### openParquetFiles

▸ **openParquetFiles**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `options?`: [*OpenParquetFileOptions*](../interfaces/parquet.openparquetfileoptions.md) & { `shards?`: *number*  }): *Promise*<ReadableStreamTree[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |
| `options?` | [*OpenParquetFileOptions*](../interfaces/parquet.openparquetfileoptions.md) & { `shards?`: *number*  } |

**Returns:** *Promise*<ReadableStreamTree[]\>

Defined in: [src/parquet.ts:13](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L13)

___

### pipeParquetFormatter

▸ **pipeParquetFormatter**(`stream`: WritableStreamTree, `schema`: ParquetSchema): WritableStreamTree

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |
| `schema` | ParquetSchema |

**Returns:** WritableStreamTree

Defined in: [src/parquet.ts:66](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L66)
