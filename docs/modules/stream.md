[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / stream

# Module: stream

## Table of contents

### Functions

- [handleAsyncFunctionCallback](stream.md#handleasyncfunctioncallback)
- [hashStream](stream.md#hashstream)
- [openNullReadable](stream.md#opennullreadable)
- [openNullWritable](stream.md#opennullwritable)
- [pipeAsyncFilter](stream.md#pipeasyncfilter)
- [pipeFilter](stream.md#pipefilter)
- [pipeFromAsyncFilter](stream.md#pipefromasyncfilter)
- [pipeFromFilter](stream.md#pipefromfilter)
- [pipeFromSyncFilter](stream.md#pipefromsyncfilter)
- [pipeSyncFilter](stream.md#pipesyncfilter)
- [readableToArray](stream.md#readabletoarray)
- [readableToBuffer](stream.md#readabletobuffer)
- [readableToString](stream.md#readabletostring)
- [readableToValue](stream.md#readabletovalue)
- [shardReadable](stream.md#shardreadable)
- [shardWritables](stream.md#shardwritables)
- [streamAsyncFilter](stream.md#streamasyncfilter)
- [streamFilter](stream.md#streamfilter)
- [streamSyncFilter](stream.md#streamsyncfilter)
- [writableToString](stream.md#writabletostring)

## Functions

### handleAsyncFunctionCallback

▸ **handleAsyncFunctionCallback**<X\>(`running`: X \| *Promise*<X\>, `callback`: (`err?`: Error) => *void*, `success?`: (`x`: X) => *void*): *void*

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `running` | X \| *Promise*<X\> |
| `callback` | (`err?`: Error) => *void* |
| `success?` | (`x`: X) => *void* |

**Returns:** *void*

Defined in: [src/stream.ts:252](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L252)

___

### hashStream

▸ **hashStream**(`stream`: Readable): *Promise*<string \| ``null``\>

Hashes a [[Readable]] stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | Readable | The stream to compute the hash of. |

**Returns:** *Promise*<string \| ``null``\>

Defined in: [src/stream.ts:231](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L231)

___

### openNullReadable

▸ `Const` **openNullReadable**(`options?`: { `objectMode?`: *boolean*  }): ReadableStreamTree

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | *object* |
| `options.objectMode?` | *boolean* |

**Returns:** ReadableStreamTree

Defined in: [src/stream.ts:5](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L5)

___

### openNullWritable

▸ `Const` **openNullWritable**(`options?`: { `objectMode?`: *boolean*  }): WritableStreamTree

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | *object* |
| `options.objectMode?` | *boolean* |

**Returns:** WritableStreamTree

Defined in: [src/stream.ts:15](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L15)

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

Defined in: [src/stream.ts:143](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L143)

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

Defined in: [src/stream.ts:129](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L129)

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

Defined in: [src/stream.ts:164](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L164)

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

Defined in: [src/stream.ts:150](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L150)

___

### pipeFromSyncFilter

▸ **pipeFromSyncFilter**(`stream`: WritableStreamTree, `filter`: (`x`: *any*) => *any*): WritableStreamTree

Pipe from sync filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |
| `filter` | (`x`: *any*) => *any* |

**Returns:** WritableStreamTree

Defined in: [src/stream.ts:157](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L157)

___

### pipeSyncFilter

▸ **pipeSyncFilter**(`stream`: ReadableStreamTree, `filter`: (`x`: *any*) => *any*): ReadableStreamTree

Pipe sync filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |
| `filter` | (`x`: *any*) => *any* |

**Returns:** ReadableStreamTree

Defined in: [src/stream.ts:136](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L136)

___

### readableToArray

▸ **readableToArray**(`stream`: ReadableStreamTree): *Promise*<unknown[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |

**Returns:** *Promise*<unknown[]\>

Defined in: [src/stream.ts:38](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L38)

___

### readableToBuffer

▸ **readableToBuffer**(`stream`: Readable): *Promise*<Buffer\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | Readable |

**Returns:** *Promise*<Buffer\>

Defined in: [src/stream.ts:29](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L29)

___

### readableToString

▸ **readableToString**(`stream`: Readable): *Promise*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | Readable |

**Returns:** *Promise*<string\>

Defined in: [src/stream.ts:25](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L25)

___

### readableToValue

▸ **readableToValue**(`stream`: ReadableStreamTree): *Promise*<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |

**Returns:** *Promise*<unknown\>

Defined in: [src/stream.ts:52](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L52)

___

### shardReadable

▸ **shardReadable**(`input`: ReadableStreamTree, `shards?`: *number*, `shardFunction?`: (`x`: *object*, `modulus`: *number*) => *number*): ReadableStreamTree[]

Split input by shardFunction

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | ReadableStreamTree |
| `shards?` | *number* |
| `shardFunction?` | (`x`: *object*, `modulus`: *number*) => *number* |

**Returns:** ReadableStreamTree[]

Defined in: [src/stream.ts:171](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L171)

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

Defined in: [src/stream.ts:188](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L188)

___

### streamAsyncFilter

▸ **streamAsyncFilter**(`filter`: (`x`: *any*) => *any*): *Transform*

Create async filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`x`: *any*) => *any* |

**Returns:** *Transform*

Defined in: [src/stream.ts:110](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L110)

___

### streamFilter

▸ **streamFilter**(`filter`: (`x`: *any*) => *any*): *Transform*

Create sync or async filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`x`: *any*) => *any* |

**Returns:** *Transform*

Defined in: [src/stream.ts:82](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L82)

___

### streamSyncFilter

▸ **streamSyncFilter**(`filter`: (`x`: *any*) => *any*): *Transform*

Create sync filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`x`: *any*) => *any* |

**Returns:** *Transform*

Defined in: [src/stream.ts:96](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L96)

___

### writableToString

▸ **writableToString**(`target`: { `value`: *string*  }): WritableStreamTree

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | *object* |
| `target.value` | *string* |

**Returns:** WritableStreamTree

Defined in: [src/stream.ts:67](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L67)
