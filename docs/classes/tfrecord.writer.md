[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [tfrecord](../modules/tfrecord.md) / Writer

# Class: Writer

[tfrecord](../modules/tfrecord.md).Writer

## Table of contents

### Methods

- [close](tfrecord.writer.md#close)
- [writeExample](tfrecord.writer.md#writeexample)
- [create](tfrecord.writer.md#create)
- [createFromStream](tfrecord.writer.md#createfromstream)

## Methods

### close

▸ **close**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: node_modules/tfrecord-stream/lib/writer.d.ts:9

___

### writeExample

▸ **writeExample**(`example`: *Example*): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `example` | *Example* |

**Returns:** *Promise*<void\>

Defined in: node_modules/tfrecord-stream/lib/writer.d.ts:8

___

### create

▸ `Static` **create**(`filePath`: PathLike): *Promise*<[*Writer*](tfrecord.writer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | PathLike |

**Returns:** *Promise*<[*Writer*](tfrecord.writer.md)\>

Defined in: node_modules/tfrecord-stream/lib/writer.d.ts:6

___

### createFromStream

▸ `Static` **createFromStream**(`stream`: *Writable*): *Promise*<[*Writer*](tfrecord.writer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | *Writable* |

**Returns:** *Promise*<[*Writer*](tfrecord.writer.md)\>

Defined in: node_modules/tfrecord-stream/lib/writer.d.ts:7
