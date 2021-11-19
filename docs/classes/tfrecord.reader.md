[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [tfrecord](../modules/tfrecord.md) / Reader

# Class: Reader

[tfrecord](../modules/tfrecord.md).Reader

## Table of contents

### Methods

- [close](tfrecord.reader.md#close)
- [readExample](tfrecord.reader.md#readexample)
- [create](tfrecord.reader.md#create)
- [createFromStream](tfrecord.reader.md#createfromstream)

## Methods

### close

▸ **close**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: node_modules/tfrecord-stream/lib/reader.d.ts:9

___

### readExample

▸ **readExample**(): *Promise*<``null`` \| Example\>

**Returns:** *Promise*<``null`` \| Example\>

Defined in: node_modules/tfrecord-stream/lib/reader.d.ts:8

___

### create

▸ `Static` **create**(`filePath`: PathLike): *Promise*<[*Reader*](tfrecord.reader.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | PathLike |

**Returns:** *Promise*<[*Reader*](tfrecord.reader.md)\>

Defined in: node_modules/tfrecord-stream/lib/reader.d.ts:6

___

### createFromStream

▸ `Static` **createFromStream**(`stream`: *Readable*): *Promise*<[*Reader*](tfrecord.reader.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | *Readable* |

**Returns:** *Promise*<[*Reader*](tfrecord.reader.md)\>

Defined in: node_modules/tfrecord-stream/lib/reader.d.ts:7
