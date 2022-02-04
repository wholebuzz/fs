[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [util](../modules/util.md) / ReadableFileOptions

# Interface: ReadableFileOptions

[util](../modules/util.md).ReadableFileOptions

## Hierarchy

- [*OpenReadableFileOptions*](fs.openreadablefileoptions.md)

  ↳ **ReadableFileOptions**

## Table of contents

### Properties

- [byteLength](util.readablefileoptions.md#bytelength)
- [byteOffset](util.readablefileoptions.md#byteoffset)
- [extra](util.readablefileoptions.md#extra)
- [extraOutput](util.readablefileoptions.md#extraoutput)
- [query](util.readablefileoptions.md#query)
- [shardFilter](util.readablefileoptions.md#shardfilter)
- [shards](util.readablefileoptions.md#shards)
- [version](util.readablefileoptions.md#version)

## Properties

### byteLength

• `Optional` **byteLength**: *number*

Inherited from: [OpenReadableFileOptions](fs.openreadablefileoptions.md).[byteLength](fs.openreadablefileoptions.md#bytelength)

Defined in: [src/fs.ts:48](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L48)

___

### byteOffset

• `Optional` **byteOffset**: *number*

Inherited from: [OpenReadableFileOptions](fs.openreadablefileoptions.md).[byteOffset](fs.openreadablefileoptions.md#byteoffset)

Defined in: [src/fs.ts:47](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L47)

___

### extra

• `Optional` **extra**: *Record*<string, any\>

Inherited from: [OpenReadableFileOptions](fs.openreadablefileoptions.md).[extra](fs.openreadablefileoptions.md#extra)

Defined in: [src/fs.ts:49](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L49)

___

### extraOutput

• `Optional` **extraOutput**: *boolean*

Inherited from: [OpenReadableFileOptions](fs.openreadablefileoptions.md).[extraOutput](fs.openreadablefileoptions.md#extraoutput)

Defined in: [src/fs.ts:50](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L50)

___

### query

• `Optional` **query**: *string*

Inherited from: [OpenReadableFileOptions](fs.openreadablefileoptions.md).[query](fs.openreadablefileoptions.md#query)

Defined in: [src/fs.ts:51](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L51)

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

Defined in: [src/util.ts:21](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L21)

___

### shards

• `Optional` **shards**: *number*

Defined in: [src/util.ts:20](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L20)

___

### version

• `Optional` **version**: *string* \| *number*

Inherited from: [OpenReadableFileOptions](fs.openreadablefileoptions.md).[version](fs.openreadablefileoptions.md#version)

Defined in: [src/fs.ts:52](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L52)
