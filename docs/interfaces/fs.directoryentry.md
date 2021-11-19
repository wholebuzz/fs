[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [fs](../modules/fs.md) / DirectoryEntry

# Interface: DirectoryEntry

[fs](../modules/fs.md).DirectoryEntry

## Hierarchy

- *Partial*<[*FileStatus*](fs.filestatus.md)\>

  ↳ **DirectoryEntry**

## Table of contents

### Properties

- [inode](fs.directoryentry.md#inode)
- [modified](fs.directoryentry.md#modified)
- [size](fs.directoryentry.md#size)
- [url](fs.directoryentry.md#url)
- [version](fs.directoryentry.md#version)

## Properties

### inode

• `Optional` **inode**: *number*

The file inode

Inherited from: Partial.inode

Defined in: [src/fs.ts:16](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L16)

___

### modified

• `Optional` **modified**: Date

The file last modified

Inherited from: Partial.modified

Defined in: [src/fs.ts:10](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L10)

___

### size

• `Optional` **size**: *number*

The file size

Inherited from: Partial.size

Defined in: [src/fs.ts:13](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L13)

___

### url

• **url**: *string*

Overrides: Partial.url

Defined in: [src/fs.ts:23](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L23)

___

### version

• `Optional` **version**: *string* \| *number*

Content hash for local file, and `metadata.generation` for GCP

Inherited from: Partial.version

Defined in: [src/fs.ts:19](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L19)
