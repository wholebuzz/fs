[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / parquet

# Module: parquet

## Table of contents

### Interfaces

- [OpenParquetFileOptions](../interfaces/parquet.openparquetfileoptions.md)
- [ParquetFileOptions](../interfaces/parquet.parquetfileoptions.md)
- [ReadableSpec](../interfaces/parquet.readablespec.md)

### Variables

- [parquetThrift](parquet.md#parquetthrift)
- [parquetUtil](parquet.md#parquetutil)

### Functions

- [newParquetEnvelopeReader](parquet.md#newparquetenvelopereader)
- [newParquetReader](parquet.md#newparquetreader)
- [openParquetFile](parquet.md#openparquetfile)
- [openParquetFiles](parquet.md#openparquetfiles)
- [openReadableFileSet](parquet.md#openreadablefileset)
- [pipeParquetFormatter](parquet.md#pipeparquetformatter)
- [readParquetFile](parquet.md#readparquetfile)

## Variables

### parquetThrift

• `Const` **parquetThrift**: *any*

Defined in: [src/parquet.ts:24](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L24)

___

### parquetUtil

• `Const` **parquetUtil**: *any*

Defined in: [src/parquet.ts:23](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L23)

## Functions

### newParquetEnvelopeReader

▸ **newParquetEnvelopeReader**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *ParquetEnvelopeReader*

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |

**Returns:** *ParquetEnvelopeReader*

Defined in: [src/parquet.ts:254](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L254)

___

### newParquetReader

▸ **newParquetReader**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *Promise*<ParquetReader\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |

**Returns:** *Promise*<ParquetReader\>

Defined in: [src/parquet.ts:246](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L246)

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

Defined in: [src/parquet.ts:82](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L82)

___

### openParquetFiles

▸ **openParquetFiles**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `options?`: [*ParquetFileOptions*](../interfaces/parquet.parquetfileoptions.md)): *Promise*<ReadableStreamTree[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |
| `options?` | [*ParquetFileOptions*](../interfaces/parquet.parquetfileoptions.md) |

**Returns:** *Promise*<ReadableStreamTree[]\>

Defined in: [src/parquet.ts:67](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L67)

___

### openReadableFileSet

▸ **openReadableFileSet**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `fileNames`: [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)[] \| *Record*<string, [*ReadableSpec*](../interfaces/parquet.readablespec.md)\>): *Promise*<Record<string, ReadableStreamTree[]\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `fileNames` | [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)[] \| *Record*<string, [*ReadableSpec*](../interfaces/parquet.readablespec.md)\> |

**Returns:** *Promise*<Record<string, ReadableStreamTree[]\>\>

Defined in: [src/parquet.ts:52](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L52)

___

### pipeParquetFormatter

▸ **pipeParquetFormatter**(`stream`: WritableStreamTree, `schema`: ParquetSchema): WritableStreamTree

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |
| `schema` | ParquetSchema |

**Returns:** WritableStreamTree

Defined in: [src/parquet.ts:266](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L266)

___

### readParquetFile

▸ **readParquetFile**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `options?`: [*OpenParquetFileOptions*](../interfaces/parquet.openparquetfileoptions.md)): *Promise*<unknown[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |
| `options?` | [*OpenParquetFileOptions*](../interfaces/parquet.openparquetfileoptions.md) |

**Returns:** *Promise*<unknown[]\>

Defined in: [src/parquet.ts:44](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L44)
