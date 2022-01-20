[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [util](../modules/util.md) / WritableFileOptions

# Interface: WritableFileOptions

[util](../modules/util.md).WritableFileOptions

## Hierarchy

- [*OpenWritableFileOptions*](fs.openwritablefileoptions.md)

  ↳ **WritableFileOptions**

## Table of contents

### Properties

- [contentType](util.writablefileoptions.md#contenttype)
- [debug](util.writablefileoptions.md#debug)
- [extra](util.writablefileoptions.md#extra)
- [gzip](util.writablefileoptions.md#gzip)
- [shardFilter](util.writablefileoptions.md#shardfilter)
- [shards](util.writablefileoptions.md#shards)
- [version](util.writablefileoptions.md#version)

## Properties

### contentType

• `Optional` **contentType**: *string*

Inherited from: [OpenWritableFileOptions](fs.openwritablefileoptions.md).[contentType](fs.openwritablefileoptions.md#contenttype)

Defined in: [src/fs.ts:30](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L30)

___

### debug

• `Optional` **debug**: *boolean*

Inherited from: [OpenWritableFileOptions](fs.openwritablefileoptions.md).[debug](fs.openwritablefileoptions.md#debug)

Defined in: [src/fs.ts:31](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L31)

___

### extra

• `Optional` **extra**: *Record*<string, any\>

Inherited from: [OpenWritableFileOptions](fs.openwritablefileoptions.md).[extra](fs.openwritablefileoptions.md#extra)

Defined in: [src/fs.ts:59](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L59)

___

### gzip

• `Optional` **gzip**: *string* \| *boolean*

Inherited from: [OpenWritableFileOptions](fs.openwritablefileoptions.md).[gzip](fs.openwritablefileoptions.md#gzip)

Defined in: [src/fs.ts:32](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L32)

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

Defined in: [src/util.ts:17](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L17)

___

### shards

• `Optional` **shards**: *number*

Defined in: [src/util.ts:16](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L16)

___

### version

• `Optional` **version**: *string* \| *number*

Inherited from: [OpenWritableFileOptions](fs.openwritablefileoptions.md).[version](fs.openwritablefileoptions.md#version)

Defined in: [src/fs.ts:60](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L60)
