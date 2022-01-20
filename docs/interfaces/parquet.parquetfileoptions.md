[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [parquet](../modules/parquet.md) / ParquetFileOptions

# Interface: ParquetFileOptions

[parquet](../modules/parquet.md).ParquetFileOptions

## Table of contents

### Properties

- [columnList](parquet.parquetfileoptions.md#columnlist)
- [shardFilter](parquet.parquetfileoptions.md#shardfilter)
- [shards](parquet.parquetfileoptions.md#shards)

## Properties

### columnList

• `Optional` **columnList**: *string*[] \| *string*[][]

Defined in: [src/parquet.ts:21](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L21)

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

Defined in: [src/parquet.ts:23](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L23)

___

### shards

• `Optional` **shards**: *number*

Defined in: [src/parquet.ts:22](https://github.com/wholebuzz/fs/blob/master/src/parquet.ts#L22)
