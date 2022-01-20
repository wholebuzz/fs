[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [merge](../modules/merge.md) / MergeStreamsOptions

# Interface: MergeStreamsOptions

[merge](../modules/merge.md).MergeStreamsOptions

## Table of contents

### Properties

- [combine](merge.mergestreamsoptions.md#combine)
- [compare](merge.mergestreamsoptions.md#compare)
- [group](merge.mergestreamsoptions.md#group)
- [labelSource](merge.mergestreamsoptions.md#labelsource)

## Properties

### combine

• `Optional` **combine**: (`group`: *any*[]) => *any*

#### Type declaration

▸ (`group`: *any*[]): *any*

#### Parameters

| Name | Type |
| :------ | :------ |
| `group` | *any*[] |

**Returns:** *any*

Defined in: [src/merge.ts:6](https://github.com/wholebuzz/fs/blob/master/src/merge.ts#L6)

___

### compare

• `Optional` **compare**: (`a`: *Record*<string, any\>, `b`: *Record*<string, any\>) => *number*

#### Type declaration

▸ (`a`: *Record*<string, any\>, `b`: *Record*<string, any\>): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | *Record*<string, any\> |
| `b` | *Record*<string, any\> |

**Returns:** *number*

Defined in: [src/merge.ts:7](https://github.com/wholebuzz/fs/blob/master/src/merge.ts#L7)

___

### group

• `Optional` **group**: *boolean*

Defined in: [src/merge.ts:8](https://github.com/wholebuzz/fs/blob/master/src/merge.ts#L8)

___

### labelSource

• `Optional` **labelSource**: *boolean*

Defined in: [src/merge.ts:9](https://github.com/wholebuzz/fs/blob/master/src/merge.ts#L9)
