[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / util

# Module: util

## Table of contents

### Interfaces

- [Shard](../interfaces/util.shard.md)

### Variables

- [logger](util.md#logger)
- [zlib](util.md#zlib)

### Functions

- [isShardedFilename](util.md#isshardedfilename)
- [md5](util.md#md5)
- [openReadableFiles](util.md#openreadablefiles)
- [openWritableFiles](util.md#openwritablefiles)
- [shardIndex](util.md#shardindex)
- [shardMatchText](util.md#shardmatchtext)
- [shardedFilename](util.md#shardedfilename)
- [shardedFilenames](util.md#shardedfilenames)

## Variables

### logger

• `Const` **logger**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | (...`args`: *any*[]) => *void* |
| `error` | (...`args`: *any*[]) => *void* |
| `info` | (...`args`: *any*[]) => *void* |

Defined in: [src/util.ts:7](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L7)

___

### zlib

• `Const` **zlib**: *any*

Defined in: [src/util.ts:4](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L4)

## Functions

### isShardedFilename

▸ `Const` **isShardedFilename**(`name`: *string*): *undefined* \| *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *undefined* \| *number*

Defined in: [src/util.ts:24](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L24)

___

### md5

▸ `Const` **md5**(`x`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** *string*

Defined in: [src/util.ts:5](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L5)

___

### openReadableFiles

▸ **openReadableFiles**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `options?`: [*OpenReadableFileOptions*](../interfaces/fs.openreadablefileoptions.md) & { `shards?`: *number*  }): *Promise*<ReadableStreamTree[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |
| `options?` | [*OpenReadableFileOptions*](../interfaces/fs.openreadablefileoptions.md) & { `shards?`: *number*  } |

**Returns:** *Promise*<ReadableStreamTree[]\>

Defined in: [src/util.ts:44](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L44)

___

### openWritableFiles

▸ **openWritableFiles**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `options?`: [*OpenWritableFileOptions*](../interfaces/fs.openwritablefileoptions.md) & { `shards?`: *number*  }): *Promise*<WritableStreamTree[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |
| `options?` | [*OpenWritableFileOptions*](../interfaces/fs.openwritablefileoptions.md) & { `shards?`: *number*  } |

**Returns:** *Promise*<WritableStreamTree[]\>

Defined in: [src/util.ts:59](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L59)

___

### shardIndex

▸ `Const` **shardIndex**(`text`: *string*, `modulus`: *number*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | *string* |
| `modulus` | *number* |

**Returns:** *number*

Defined in: [src/util.ts:18](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L18)

___

### shardMatchText

▸ `Const` **shardMatchText**(`text`: *string*, `shard`: [*Shard*](../interfaces/util.shard.md)): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | *string* |
| `shard` | [*Shard*](../interfaces/util.shard.md) |

**Returns:** *boolean*

Defined in: [src/util.ts:21](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L21)

___

### shardedFilename

▸ `Const` **shardedFilename**(`name`: *string*, `shard`: [*Shard*](../interfaces/util.shard.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |
| `shard` | [*Shard*](../interfaces/util.shard.md) |

**Returns:** *string*

Defined in: [src/util.ts:26](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L26)

___

### shardedFilenames

▸ `Const` **shardedFilenames**(`name`: *string*, `shards`: *number*): *string*[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |
| `shards` | *number* |

**Returns:** *string*[]

Defined in: [src/util.ts:39](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L39)
