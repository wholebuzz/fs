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
- [lastItem](util.md#lastitem)
- [lastItemOrNull](util.md#lastitemornull)
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
- [take](util.md#take)
- [waitForCompleteShardedInput](util.md#waitforcompleteshardedinput)

## Variables

### logger

• `Const` **logger**: [*Logger*](../interfaces/util.logger.md)

Defined in: [src/util.ts:18](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L18)

___

### shardRegex

• `Const` **shardRegex**: *RegExp*

Defined in: [src/util.ts:59](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L59)

___

### shardedRegex

• `Const` **shardedRegex**: *RegExp*

Defined in: [src/util.ts:58](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L58)

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

Defined in: [src/util.ts:66](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L66)

___

### isShardFilename

▸ `Const` **isShardFilename**(`name`: *string*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *number*

Defined in: [src/util.ts:61](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L61)

___

### isShardedFilename

▸ `Const` **isShardedFilename**(`name`: *string*): *undefined* \| *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *undefined* \| *number*

Defined in: [src/util.ts:60](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L60)

___

### lastItem

▸ `Const` **lastItem**<X\>(`x`: X[]): X

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | X[] |

**Returns:** X

Defined in: [src/util.ts:7](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L7)

___

### lastItemOrNull

▸ `Const` **lastItemOrNull**<X\>(`x`: X[]): ``null`` \| X

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | X[] |

**Returns:** ``null`` \| X

Defined in: [src/util.ts:8](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L8)

___

### md5

▸ `Const` **md5**(`x`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** *string*

Defined in: [src/util.ts:10](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L10)

___

### openReadableFileSet

▸ **openReadableFileSet**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `fileNames`: [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)[] \| *Record*<string, [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)\>): *Promise*<Record<string, ReadableStreamTree[]\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `fileNames` | [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)[] \| *Record*<string, [*ReadableFileSpec*](../interfaces/util.readablefilespec.md)\> |

**Returns:** *Promise*<Record<string, ReadableStreamTree[]\>\>

Defined in: [src/util.ts:161](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L161)

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

Defined in: [src/util.ts:174](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L174)

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

Defined in: [src/util.ts:189](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L189)

___

### readShardFilenames

▸ **readShardFilenames**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *Promise*<{ `entries`: [*DirectoryEntry*](../interfaces/fs.directoryentry.md)[] ; `numShards`: *number*  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |

**Returns:** *Promise*<{ `entries`: [*DirectoryEntry*](../interfaces/fs.directoryentry.md)[] ; `numShards`: *number*  }\>

Defined in: [src/util.ts:97](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L97)

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

Defined in: [src/util.ts:46](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L46)

___

### shardIndexOfFilename

▸ `Const` **shardIndexOfFilename**(`name`: *string*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *number*

Defined in: [src/util.ts:63](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L63)

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

Defined in: [src/util.ts:52](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L52)

___

### shardedFilename

▸ `Const` **shardedFilename**(`name`: *string*, `shard`: [*Shard*](../interfaces/util.shard.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |
| `shard` | [*Shard*](../interfaces/util.shard.md) |

**Returns:** *string*

Defined in: [src/util.ts:73](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L73)

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

Defined in: [src/util.ts:87](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L87)

___

### take

▸ `Const` **take**<X, Y\>(`x`: X, `f`: (`x`: X) => Y): Y

#### Type parameters

| Name |
| :------ |
| `X` |
| `Y` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | X |
| `f` | (`x`: X) => Y |

**Returns:** Y

Defined in: [src/util.ts:9](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L9)

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

Defined in: [src/util.ts:139](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L139)
