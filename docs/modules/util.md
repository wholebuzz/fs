[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / util

# Module: util

## Table of contents

### Variables

- [logger](util.md#logger)
- [zlib](util.md#zlib)

### Functions

- [hashStream](util.md#hashstream)

## Variables

### logger

• `Const` **logger**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | (...`args`: *any*[]) => *void* |
| `error` | (...`args`: *any*[]) => *void* |
| `info` | (...`args`: *any*[]) => *void* |

Defined in: [util.ts:7](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L7)

___

### zlib

• `Const` **zlib**: *any*

Defined in: [util.ts:5](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L5)

## Functions

### hashStream

▸ **hashStream**(`stream`: Readable): *Promise*<string \| ``null``\>

Hashes a [[Readable]] stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | Readable | The stream to compute the hash of. |

**Returns:** *Promise*<string \| ``null``\>

Defined in: [util.ts:17](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L17)
