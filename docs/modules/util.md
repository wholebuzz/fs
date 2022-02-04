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
- [shardRegex](util.md#shardregex)
- [shardedRegex](util.md#shardedregex)
- [zlib](util.md#zlib)

### Functions

- [allShardsFilename](util.md#allshardsfilename)
- [isShardFilename](util.md#isshardfilename)
- [isShardedFilename](util.md#isshardedfilename)
- [md5](util.md#md5)
- [openReadableFileSet](util.md#openreadablefileset)
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

Defined in: [src/util.ts:8](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L8)

___

### shardRegex

• `Const` **shardRegex**: *RegExp*

Defined in: [src/util.ts:41](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L41)

___

### shardedRegex

• `Const` **shardedRegex**: *RegExp*

Defined in: [src/util.ts:42](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L42)

___

### zlib

• `Const` **zlib**: *any*

Defined in: [src/util.ts:5](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L5)

## Functions

### allShardsFilename

▸ `Const` **allShardsFilename**(`name`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *string*

Defined in: [src/util.ts:45](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L45)

___

### isShardFilename

▸ `Const` **isShardFilename**(`name`: *string*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *number*

Defined in: [src/util.ts:43](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L43)

___

### isShardedFilename

▸ `Const` **isShardedFilename**(`name`: *string*): *undefined* \| *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *undefined* \| *number*

Defined in: [src/util.ts:44](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L44)

___

### md5

▸ `Const` **md5**(`x`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** *string*

Defined in: [src/util.ts:6](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L6)

___

### openReadableFileSet

▸ **openReadableFileSet**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `fileNames`: [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)[] \| *Record*<string, [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)\>): *Promise*<Record<string, ReadableStreamTree[]\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `fileNames` | [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)[] \| *Record*<string, [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)\> |

**Returns:** *Promise*<Record<string, ReadableStreamTree[]\>\>

Defined in: [src/util.ts:70](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L70)

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

Defined in: [src/util.ts:81](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L81)

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

Defined in: [src/util.ts:96](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L96)

___

### shardIndex

▸ `Const` **shardIndex**(`text`: *string*, `modulus`: *number*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | *string* |
| `modulus` | *number* |

**Returns:** *number*

Defined in: [src/util.ts:35](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L35)

___

### shardMatchText

▸ `Const` **shardMatchText**(`text`: *string*, `shard`: [*Shard*](../interfaces/util.shard.md)): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | *string* |
| `shard` | [*Shard*](../interfaces/util.shard.md) |

**Returns:** *boolean*

Defined in: [src/util.ts:38](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L38)

___

### shardedFilename

▸ `Const` **shardedFilename**(`name`: *string*, `shard`: [*Shard*](../interfaces/util.shard.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |
| `shard` | [*Shard*](../interfaces/util.shard.md) |

**Returns:** *string*

Defined in: [src/util.ts:47](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L47)

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

Defined in: [src/util.ts:60](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L60)
