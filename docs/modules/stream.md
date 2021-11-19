[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / stream

# Module: stream

## Table of contents

### Functions

- [pipeFilter](stream.md#pipefilter)
- [pipeFromFilter](stream.md#pipefromfilter)
- [readableToBuffer](stream.md#readabletobuffer)
- [readableToString](stream.md#readabletostring)
- [writableToString](stream.md#writabletostring)

## Functions

### pipeFilter

▸ **pipeFilter**(`stream`: ReadableStreamTree, `filter`: (`x`: *any*) => *any*): ReadableStreamTree

Create filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |
| `filter` | (`x`: *any*) => *any* |

**Returns:** ReadableStreamTree

Defined in: [src/stream.ts:33](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L33)

___

### pipeFromFilter

▸ **pipeFromFilter**(`stream`: WritableStreamTree, `filter`: (`x`: *any*) => *any*): WritableStreamTree

Create filter stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | WritableStreamTree |
| `filter` | (`x`: *any*) => *any* |

**Returns:** WritableStreamTree

Defined in: [src/stream.ts:46](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L46)

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

### writableToString

▸ **writableToString**(`target`: { `value`: *string*  }): WritableStreamTree

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | *object* |
| `target.value` | *string* |

**Returns:** WritableStreamTree

Defined in: [src/stream.ts:18](https://github.com/wholebuzz/fs/blob/master/src/stream.ts#L18)
