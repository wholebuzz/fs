[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / lines

# Module: lines

## Table of contents

### Functions

- [appendLine](lines.md#appendline)
- [mapLines](lines.md#maplines)
- [mapLinesWithHeader](lines.md#maplineswithheader)
- [parseLines](lines.md#parselines)
- [readLines](lines.md#readlines)
- [readLinesWithHeader](lines.md#readlineswithheader)
- [writeContent](lines.md#writecontent)

## Functions

### appendLine

▸ **appendLine**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `urlText`: *string*, `line`: *string*): *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md) \| ``null``\>

Appends a line of text to a file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) |
| `urlText` | *string* |
| `line` | *string* |

**Returns:** *Promise*<[*FileStatus*](../interfaces/fs.filestatus.md) \| ``null``\>

Defined in: [src/lines.ts:88](https://github.com/wholebuzz/fs/blob/master/src/lines.ts#L88)

___

### mapLines

▸ **mapLines**<X\>(`stream`: ReadableStreamTree, `map`: (`x`: *string*) => X): *Promise*<X[]\>

Maps lines from [[stream]].  Used to implement [readLines](lines.md#readlines).

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | ReadableStreamTree | The stream to read lines from. |
| `map` | (`x`: *string*) => X | - |

**Returns:** *Promise*<X[]\>

Defined in: [src/lines.ts:50](https://github.com/wholebuzz/fs/blob/master/src/lines.ts#L50)

___

### mapLinesWithHeader

▸ **mapLinesWithHeader**<X, H\>(`stream`: ReadableStreamTree, `map`: (`x`: *string*) => X, `header?`: (`y`: *string*) => H, `ret?`: X[]): *Promise*<[H \| *undefined*, X[]]\>

Parses lines (with header) from [[stream]].  Used to implement [readLinesWithHeader](lines.md#readlineswithheader).

#### Type parameters

| Name |
| :------ |
| `X` |
| `H` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `stream` | ReadableStreamTree | - | The stream to read lines from. |
| `map` | (`x`: *string*) => X | - | - |
| `header?` | (`y`: *string*) => H | - | - |
| `ret` | X[] | [] | - |

**Returns:** *Promise*<[H \| *undefined*, X[]]\>

Defined in: [src/lines.ts:60](https://github.com/wholebuzz/fs/blob/master/src/lines.ts#L60)

___

### parseLines

▸ **parseLines**(`stream`: ReadableStreamTree, `callback`: (`x`: *string*) => *void*): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | ReadableStreamTree |
| `callback` | (`x`: *string*) => *void* |

**Returns:** *Promise*<void\>

Defined in: [src/lines.ts:34](https://github.com/wholebuzz/fs/blob/master/src/lines.ts#L34)

___

### readLines

▸ **readLines**<X\>(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `map`: (`x`: *string*) => X): *Promise*<X[]\>

Reads every line from a file.

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to read lines from. |
| `map` | (`x`: *string*) => X | Callback called for each line. |

**Returns:** *Promise*<X[]\>

Defined in: [src/lines.ts:10](https://github.com/wholebuzz/fs/blob/master/src/lines.ts#L10)

___

### readLinesWithHeader

▸ **readLinesWithHeader**<X, H\>(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `map`: (`x`: *string*) => X, `header?`: (`x`: *string*) => H, `ret?`: X[]): *Promise*<[H \| *undefined*, X[]]\>

Reads every line from a file, treating the first line as a header.

#### Type parameters

| Name |
| :------ |
| `X` |
| `H` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - | - |
| `url` | *string* | - | The URL of the file to read lines from. |
| `map` | (`x`: *string*) => X | - | Callback called for every line succeeding the header. |
| `header?` | (`x`: *string*) => H | - | Callback called for the first line. |
| `ret` | X[] | [] | - |

**Returns:** *Promise*<[H \| *undefined*, X[]]\>

Defined in: [src/lines.ts:24](https://github.com/wholebuzz/fs/blob/master/src/lines.ts#L24)

___

### writeContent

▸ **writeContent**(`fileSystem`: [*FileSystem*](../classes/fs.filesystem.md), `url`: *string*, `value`: *string*): *Promise*<void\>

Writes the string to a file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystem` | [*FileSystem*](../classes/fs.filesystem.md) | - |
| `url` | *string* | The URL of the file to serialize the string to. |
| `value` | *string* | The string to serialize. |

**Returns:** *Promise*<void\>

Defined in: [src/lines.ts:107](https://github.com/wholebuzz/fs/blob/master/src/lines.ts#L107)
