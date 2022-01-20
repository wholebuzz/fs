[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / stream

# Module: stream

## Table of contents

### Functions

- [hashStream](stream.md#hashstream)
- [pipeAsyncFilter](stream.md#pipeasyncfilter)
- [pipeFilter](stream.md#pipefilter)
- [pipeFromAsyncFilter](stream.md#pipefromasyncfilter)
- [pipeFromFilter](stream.md#pipefromfilter)
- [readableToBuffer](stream.md#readabletobuffer)
- [readableToString](stream.md#readabletostring)
- [shardWritables](stream.md#shardwritables)
- [streamAsyncFilter](stream.md#streamasyncfilter)
- [streamFilter](stream.md#streamfilter)
- [writableToString](stream.md#writabletostring)

## Functions

### hashStream

▸ **hashStream**(`stream`: Readable): *Promise*<string \| ``null``\>

Hashes a [[Readable]] stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | Readable | The stream to compute the hash of. |

**Returns:** *Promise*<string \| ``null``\>

Defined in: [src/stream.ts:124](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L124)

___

### pipeAsyncFilter

▸ **pipeAsyncFilter**(`stream`: ReadableStreamTree, `filter`: (`x`: *any*) => *any*): ReadableStreamTree

Pipe async filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |
| `filter` | (`x`: *any*) => *any* |

**Returns:** ReadableStreamTree

Defined in: [src/stream.ts:73](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L73)

___

### pipeFilter

▸ **pipeFilter**(`stream`: ReadableStreamTree, `filter`: (`x`: *any*) => *any*): ReadableStreamTree

Pipe filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |
| `filter` | (`x`: *any*) => *any* |

**Returns:** ReadableStreamTree

Defined in: [src/stream.ts:66](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L66)

___

### pipeFromAsyncFilter

▸ **pipeFromAsyncFilter**(`stream`: WritableStreamTree, `filter`: (`x`: *any*) => *any*): WritableStreamTree

Pipe from async filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |
| `filter` | (`x`: *any*) => *any* |

**Returns:** WritableStreamTree

Defined in: [src/stream.ts:87](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L87)

___

### pipeFromFilter

▸ **pipeFromFilter**(`stream`: WritableStreamTree, `filter`: (`x`: *any*) => *any*): WritableStreamTree

Pipe from filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |
| `filter` | (`x`: *any*) => *any* |

**Returns:** WritableStreamTree

Defined in: [src/stream.ts:80](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L80)

___

### readableToBuffer

▸ **readableToBuffer**(`stream`: Readable): *Promise*<Buffer\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | Readable |

**Returns:** *Promise*<Buffer\>

Defined in: [src/stream.ts:9](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L9)

___

### readableToString

▸ **readableToString**(`stream`: Readable): *Promise*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | Readable |

**Returns:** *Promise*<string\>

Defined in: [src/stream.ts:5](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L5)

___

### shardWritables

▸ **shardWritables**(`writable`: WritableStreamTree[], `shards?`: *number*, `shardFunction?`: (`x`: *object*, `modulus`: *number*) => *number*): WritableStreamTree

Split input by shardFunction

#### Parameters

| Name | Type |
| :------ | :------ |
| `writable` | WritableStreamTree[] |
| `shards?` | *number* |
| `shardFunction?` | (`x`: *object*, `modulus`: *number*) => *number* |

**Returns:** WritableStreamTree

Defined in: [src/stream.ts:94](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L94)

___

### streamAsyncFilter

▸ **streamAsyncFilter**(`filter`: (`x`: *any*) => *any*): *Transform*

Create async filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`x`: *any*) => *any* |

**Returns:** *Transform*

Defined in: [src/stream.ts:47](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L47)

___

### streamFilter

▸ **streamFilter**(`filter`: (`x`: *any*) => *any*): *Transform*

Create filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`x`: *any*) => *any* |

**Returns:** *Transform*

Defined in: [src/stream.ts:33](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L33)

___

### writableToString

▸ **writableToString**(`target`: { `value`: *string*  }): WritableStreamTree

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | *object* |
| `target.value` | *string* |

**Returns:** WritableStreamTree

Defined in: [src/stream.ts:18](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L18)
