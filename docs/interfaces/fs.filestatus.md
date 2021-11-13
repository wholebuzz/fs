[@wholebuzz/fs](../README.md) / [Exports](../modules.md) / [fs](../modules/fs.md) / FileStatus

# Interface: FileStatus

[fs](../modules/fs.md).FileStatus

File status like `struct stat` with added versioning.

## Table of contents

### Properties

- [inode](fs.filestatus.md#inode)
- [modified](fs.filestatus.md#modified)
- [size](fs.filestatus.md#size)
- [url](fs.filestatus.md#url)
- [version](fs.filestatus.md#version)

## Properties

### inode

• **inode**: *number*

The file inode

Defined in: [fs.ts:16](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L16)

___

### modified

• **modified**: Date

The file last modified

Defined in: [fs.ts:10](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L10)

___

### size

• **size**: *number*

The file size

Defined in: [fs.ts:13](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L13)

___

### url

• **url**: *string*

Defined in: [fs.ts:7](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L7)

___

### version

• **version**: *string* \| *number*

Content hash for local file, and `metadata.generation` for GCP

Defined in: [fs.ts:19](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L19)
