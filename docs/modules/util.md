[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / util

# Module: util

## Table of contents

### Interfaces

- [Logger](../interfaces/util.logger.md)
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
- [readShardFilenames](util.md#readshardfilenames)
- [shardIndex](util.md#shardindex)
- [shardIndexOfFilename](util.md#shardindexoffilename)
- [shardMatchText](util.md#shardmatchtext)
- [shardedFilename](util.md#shardedfilename)
- [shardedFilenames](util.md#shardedfilenames)
- [waitForCompleteShardedInput](util.md#waitforcompleteshardedinput)

## Variables

### logger

• `Const` **logger**: [*Logger*](../interfaces/util.logger.md)

Defined in: [src/util.ts:15](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L15)

___

### shardRegex

• `Const` **shardRegex**: *RegExp*

Defined in: [src/util.ts:56](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L56)

___

### shardedRegex

• `Const` **shardedRegex**: *RegExp*

Defined in: [src/util.ts:55](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L55)

___

### zlib

• `Const` **zlib**: *any*

Defined in: [src/util.ts:6](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L6)

## Functions

### allShardsFilename

▸ **allShardsFilename**(`name`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *string*

Defined in: [src/util.ts:63](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L63)

___

### isShardFilename

▸ `Const` **isShardFilename**(`name`: *string*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *number*

Defined in: [src/util.ts:58](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L58)

___

### isShardedFilename

▸ `Const` **isShardedFilename**(`name`: *string*): *undefined* \| *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *undefined* \| *number*

Defined in: [src/util.ts:57](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L57)

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

Defined in: [src/util.ts:147](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L147)

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

Defined in: [src/util.ts:160](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L160)

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

Defined in: [src/util.ts:175](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L175)

___

### readShardFilenames

▸ **readShardFilenames**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *Promise*<{ `entries`: [*DirectoryEntry*](../interfaces/fs.directoryentry.md)[] ; `numShards`: *number*  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |

**Returns:** *Promise*<{ `entries`: [*DirectoryEntry*](../interfaces/fs.directoryentry.md)[] ; `numShards`: *number*  }\>

Defined in: [src/util.ts:94](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L94)

___

### shardIndex

▸ `Const` **shardIndex**(`text`: *string*, `modulus`: *number*, `shardFunction?`: (`key`: *string*) => *string*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | *string* |
| `modulus` | *number* |
| `shardFunction?` | (`key`: *string*) => *string* |

**Returns:** *number*

Defined in: [src/util.ts:43](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L43)

___

### shardIndexOfFilename

▸ `Const` **shardIndexOfFilename**(`name`: *string*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *number*

Defined in: [src/util.ts:60](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L60)

___

### shardMatchText

▸ `Const` **shardMatchText**(`text`: *string*, `shard`: [*Shard*](../interfaces/util.shard.md), `shardFunction?`: (`key`: *string*) => *string*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | *string* |
| `shard` | [*Shard*](../interfaces/util.shard.md) |
| `shardFunction?` | (`key`: *string*) => *string* |

**Returns:** *boolean*

Defined in: [src/util.ts:49](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L49)

___

### shardedFilename

▸ `Const` **shardedFilename**(`name`: *string*, `shard`: [*Shard*](../interfaces/util.shard.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |
| `shard` | [*Shard*](../interfaces/util.shard.md) |

**Returns:** *string*

Defined in: [src/util.ts:70](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L70)

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

Defined in: [src/util.ts:84](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L84)

___

### waitForCompleteShardedInput

▸ **waitForCompleteShardedInput**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `args`: { `delay?`: (`trys`: *number*) => *number* ; `maxTrys?`: *number* ; `shards?`: *number*  }): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |
| `args` | *object* |
| `args.delay?` | (`trys`: *number*) => *number* |
| `args.maxTrys?` | *number* |
| `args.shards?` | *number* |

**Returns:** *Promise*<void\>

Defined in: [src/util.ts:125](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L125)
