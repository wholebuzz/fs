[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [parquet](../modules/parquet.md) / ParquetFileOptions

# Interface: ParquetFileOptions

[parquet](../modules/parquet.md).ParquetFileOptions

## Table of contents

### Properties

- [columnList](parquet.parquetfileoptions.md#columnlist)
- [shardFilter](parquet.parquetfileoptions.md#shardfilter)
- [shards](parquet.parquetfileoptions.md#shards)
- [streamingParquet](parquet.parquetfileoptions.md#streamingparquet)

## Properties

### columnList

• `Optional` **columnList**: *string*[] \| *string*[][]

Defined in: [src/parquet.ts:31](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L31)

___

### shardFilter

• `Optional` **shardFilter**: (`index`: *number*) => *boolean*

#### Type declaration

▸ (`index`: *number*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | *number* |

**Returns:** *boolean*

Defined in: [src/parquet.ts:33](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L33)

___

### shards

• `Optional` **shards**: *number*

Defined in: [src/parquet.ts:32](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L32)

___

### streamingParquet

• `Optional` **streamingParquet**: *boolean*

Defined in: [src/parquet.ts:34](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L34)
