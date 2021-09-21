[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / util

# Module: util

## Table of contents

### Interfaces

- [Shard](../interfaces/util.shard.md)

### Variables

- [logger](util.md#logger)
- [zlib](util.md#zlib)

### Functions

- [hashStream](util.md#hashstream)
- [isShardedFilename](util.md#isshardedfilename)
- [md5](util.md#md5)
- [shardIndex](util.md#shardindex)
- [shardMatchText](util.md#shardmatchtext)
- [shardedFilename](util.md#shardedfilename)

## Variables

### logger

• `Const` **logger**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | (...`args`: *any*[]) => *void* |
| `error` | (...`args`: *any*[]) => *void* |
| `info` | (...`args`: *any*[]) => *void* |

Defined in: [util.ts:8](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L8)

___

### zlib

• `Const` **zlib**: *any*

Defined in: [util.ts:6](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L6)

## Functions

### hashStream

▸ **hashStream**(`stream`: Readable): *Promise*<string \| ``null``\>

Hashes a [[Readable]] stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | Readable | The stream to compute the hash of. |

**Returns:** *Promise*<string \| ``null``\>

Defined in: [util.ts:46](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L46)

___

### isShardedFilename

▸ `Const` **isShardedFilename**(`name`: *string*): *undefined* \| *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *undefined* \| *number*

Defined in: [util.ts:25](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L25)

___

### md5

▸ `Const` **md5**(`x`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** *string*

Defined in: [util.ts:40](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L40)

___

### shardIndex

▸ `Const` **shardIndex**(`text`: *string*, `modulus`: *number*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | *string* |
| `modulus` | *number* |

**Returns:** *number*

Defined in: [util.ts:19](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L19)

___

### shardMatchText

▸ `Const` **shardMatchText**(`text`: *string*, `shard`: [*Shard*](../interfaces/util.shard.md)): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | *string* |
| `shard` | [*Shard*](../interfaces/util.shard.md) |

**Returns:** *boolean*

Defined in: [util.ts:22](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L22)

___

### shardedFilename

▸ `Const` **shardedFilename**(`name`: *string*, `shard`: [*Shard*](../interfaces/util.shard.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |
| `shard` | [*Shard*](../interfaces/util.shard.md) |

**Returns:** *string*

Defined in: [util.ts:27](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L27)
