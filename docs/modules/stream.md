[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / stream

# Module: stream

## Table of contents

### Functions

- [hashStream](stream.md#hashstream)
- [openNullReadable](stream.md#opennullreadable)
- [openNullWritable](stream.md#opennullwritable)
- [pipeAsyncFilter](stream.md#pipeasyncfilter)
- [pipeFilter](stream.md#pipefilter)
- [pipeFromAsyncFilter](stream.md#pipefromasyncfilter)
- [pipeFromFilter](stream.md#pipefromfilter)
- [readableToArray](stream.md#readabletoarray)
- [readableToBuffer](stream.md#readabletobuffer)
- [readableToString](stream.md#readabletostring)
- [readableToValue](stream.md#readabletovalue)
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

Defined in: [src/stream.ts:171](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L171)

___

### openNullReadable

▸ `Const` **openNullReadable**(): ReadableStreamTree

**Returns:** ReadableStreamTree

Defined in: [src/stream.ts:5](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L5)

___

### openNullWritable

▸ `Const` **openNullWritable**(): WritableStreamTree

**Returns:** WritableStreamTree

Defined in: [src/stream.ts:14](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L14)

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

Defined in: [src/stream.ts:120](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L120)

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

Defined in: [src/stream.ts:113](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L113)

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

Defined in: [src/stream.ts:134](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L134)

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

Defined in: [src/stream.ts:127](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L127)

___

### readableToArray

▸ **readableToArray**(`stream`: ReadableStreamTree): *Promise*<unknown[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |

**Returns:** *Promise*<unknown[]\>

Defined in: [src/stream.ts:36](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L36)

___

### readableToBuffer

▸ **readableToBuffer**(`stream`: Readable): *Promise*<Buffer\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | Readable |

**Returns:** *Promise*<Buffer\>

Defined in: [src/stream.ts:27](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L27)

___

### readableToString

▸ **readableToString**(`stream`: Readable): *Promise*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | Readable |

**Returns:** *Promise*<string\>

Defined in: [src/stream.ts:23](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L23)

___

### readableToValue

▸ **readableToValue**(`stream`: ReadableStreamTree): *Promise*<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |

**Returns:** *Promise*<unknown\>

Defined in: [src/stream.ts:50](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L50)

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

Defined in: [src/stream.ts:141](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L141)

___

### streamAsyncFilter

▸ **streamAsyncFilter**(`filter`: (`x`: *any*) => *any*): *Transform*

Create async filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`x`: *any*) => *any* |

**Returns:** *Transform*

Defined in: [src/stream.ts:94](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L94)

___

### streamFilter

▸ **streamFilter**(`filter`: (`x`: *any*) => *any*): *Transform*

Create filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`x`: *any*) => *any* |

**Returns:** *Transform*

Defined in: [src/stream.ts:80](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L80)

___

### writableToString

▸ **writableToString**(`target`: { `value`: *string*  }): WritableStreamTree

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | *object* |
| `target.value` | *string* |

**Returns:** WritableStreamTree

Defined in: [src/stream.ts:65](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L65)
