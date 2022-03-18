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
- [shardMatchText](util.md#shardmatchtext)
- [shardedFilename](util.md#shardedfilename)
- [shardedFilenames](util.md#shardedfilenames)

## Variables

### logger

• `Const` **logger**: [*Logger*](../interfaces/util.logger.md)

Defined in: [src/util.ts:15](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L15)

___

### shardRegex

• `Const` **shardRegex**: *RegExp*

Defined in: [src/util.ts:55](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L55)

___

### shardedRegex

• `Const` **shardedRegex**: *RegExp*

Defined in: [src/util.ts:56](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L56)

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

Defined in: [src/util.ts:59](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L59)

___

### isShardFilename

▸ `Const` **isShardFilename**(`name`: *string*): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *number*

Defined in: [src/util.ts:57](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L57)

___

### isShardedFilename

▸ `Const` **isShardedFilename**(`name`: *string*): *undefined* \| *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | *string* |

**Returns:** *undefined* \| *number*

Defined in: [src/util.ts:58](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L58)

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

Defined in: [src/util.ts:108](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L108)

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

Defined in: [src/util.ts:121](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L121)

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

Defined in: [src/util.ts:136](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L136)

___

### readShardFilenames

▸ **readShardFilenames**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*): *Promise*<{ `entries`: [*DirectoryEntry*](../interfaces/fs.directoryentry.md)[] ; `numShards`: *number*  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `url` | *string* |

**Returns:** *Promise*<{ `entries`: [*DirectoryEntry*](../interfaces/fs.directoryentry.md)[] ; `numShards`: *number*  }\>

Defined in: [src/util.ts:85](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L85)

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

Defined in: [src/util.ts:61](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L61)

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

Defined in: [src/util.ts:75](https://github.com/wholebuzz/fs/blob/master/src/util.ts#L75)
