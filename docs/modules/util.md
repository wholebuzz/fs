[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / util

# Module: util

## Table of contents

### Interfaces

- [ReadableFileOptions](../interfaces/util.readablefileoptions.md)
- [ReadableFileSpec](../interfaces/util.readablefilespec.md)
- [Shard](../interfaces/util.shard.md)
- [WritableFileOptions](../interfaces/util.writablefileoptions.md)

### Variables

- [logger](util.md#logger)
- [zlib](util.md#zlib)

### Functions

- [isShardedFilename](util.md#isshardedfilename)
- [md5](util.md#md5)
- [openReadableFileSet](util.md#openreadablefileset)
- [openReadableFiles](util.md#openreadablefiles)
- [openWritableFiles](util.md#openwritablefiles)
- [shardIndex](util.md#shardindex)
- [shardMatchText](util.md#shardmatchtext)
- [shardedFilename](util.md#shardedfilename)
- [shardedFilenames](util.md#shardedfilenames)
- [streamToArray](util.md#streamtoarray)
- [streamToValue](util.md#streamtovalue)

## Variables

### logger

• `Const` **logger**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | (...`args`: *any*[]) => *void* |
| `error` | (...`args`: *any*[]) => *void* |
| `info` | (...`args`: *any*[]) => *void* |

Defined in: [src/util.ts:9](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L9)

___

### zlib

• `Const` **zlib**: *any*

Defined in: [src/util.ts:6](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L6)

## Functions

### isShardedFilename

▸ `Const` **isShardedFilename**(`name`: *string*): *undefined* \| *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *undefined* \| *number*

Defined in: [src/util.ts:42](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L42)

___

### md5

▸ `Const` **md5**(`x`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** *string*

Defined in: [src/util.ts:7](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L7)

___

### openReadableFileSet

▸ **openReadableFileSet**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `fileNames`: [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)[] \| *Record*<string, [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)\>): *Promise*<Record<string, ReadableStreamTree[]\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `fileNames` | [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)[] \| *Record*<string, [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)\> |

**Returns:** *Promise*<Record<string, ReadableStreamTree[]\>\>

Defined in: [src/util.ts:67](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L67)

___

### openReadableFiles

▸ **openReadableFiles**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `options?`: [*ReadableFileOptions*](../interfaces/util.readablefileoptions.md)): *Promise*<ReadableStreamTree[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |
| `options?` | [*ReadableFileOptions*](../interfaces/util.readablefileoptions.md) |

**Returns:** *Promise*<ReadableStreamTree[]\>

Defined in: [src/util.ts:78](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L78)

___

### openWritableFiles

▸ **openWritableFiles**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `options?`: [*WritableFileOptions*](../interfaces/util.writablefileoptions.md)): *Promise*<WritableStreamTree[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |
| `options?` | [*WritableFileOptions*](../interfaces/util.writablefileoptions.md) |

**Returns:** *Promise*<WritableStreamTree[]\>

Defined in: [src/util.ts:93](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L93)

___

### shardIndex

▸ `Const` **shardIndex**(`text`: *string*, `modulus`: *number*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | *string* |
| `modulus` | *number* |

**Returns:** *number*

Defined in: [src/util.ts:36](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L36)

___

### shardMatchText

▸ `Const` **shardMatchText**(`text`: *string*, `shard`: [*Shard*](../interfaces/util.shard.md)): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | *string* |
| `shard` | [*Shard*](../interfaces/util.shard.md) |

**Returns:** *boolean*

Defined in: [src/util.ts:39](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L39)

___

### shardedFilename

▸ `Const` **shardedFilename**(`name`: *string*, `shard`: [*Shard*](../interfaces/util.shard.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |
| `shard` | [*Shard*](../interfaces/util.shard.md) |

**Returns:** *string*

Defined in: [src/util.ts:44](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L44)

___

### shardedFilenames

▸ `Const` **shardedFilenames**(`name`: *string*, `shards`: *number*, `filter?`: (`index`: *number*) => *boolean*): *string*[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |
| `shards` | *number* |
| `filter?` | (`index`: *number*) => *boolean* |

**Returns:** *string*[]

Defined in: [src/util.ts:57](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L57)

___

### streamToArray

▸ **streamToArray**(`stream`: ReadableStreamTree): *Promise*<unknown[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |

**Returns:** *Promise*<unknown[]\>

Defined in: [src/util.ts:108](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L108)

___

### streamToValue

▸ **streamToValue**(`stream`: ReadableStreamTree): *Promise*<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |

**Returns:** *Promise*<unknown\>

Defined in: [src/util.ts:122](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L122)
