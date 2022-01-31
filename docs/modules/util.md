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

### shardRegex

• `Const` **shardRegex**: *RegExp*

Defined in: [src/util.ts:42](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L42)

___

### shardedRegex

• `Const` **shardedRegex**: *RegExp*

Defined in: [src/util.ts:43](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L43)

___

### zlib

• `Const` **zlib**: *any*

Defined in: [src/util.ts:6](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L6)

## Functions

### allShardsFilename

▸ `Const` **allShardsFilename**(`name`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *string*

Defined in: [src/util.ts:46](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L46)

___

### isShardFilename

▸ `Const` **isShardFilename**(`name`: *string*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *number*

Defined in: [src/util.ts:44](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L44)

___

### isShardedFilename

▸ `Const` **isShardedFilename**(`name`: *string*): *undefined* \| *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *undefined* \| *number*

Defined in: [src/util.ts:45](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L45)

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

Defined in: [src/util.ts:71](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L71)

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

Defined in: [src/util.ts:82](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L82)

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

Defined in: [src/util.ts:97](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L97)

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

Defined in: [src/util.ts:48](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L48)

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

Defined in: [src/util.ts:61](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L61)

___

### streamToArray

▸ **streamToArray**(`stream`: ReadableStreamTree): *Promise*<unknown[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |

**Returns:** *Promise*<unknown[]\>

Defined in: [src/util.ts:112](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L112)

___

### streamToValue

▸ **streamToValue**(`stream`: ReadableStreamTree): *Promise*<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |

**Returns:** *Promise*<unknown\>

Defined in: [src/util.ts:126](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L126)
