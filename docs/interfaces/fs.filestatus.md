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

Defined in: [fs.ts:34](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L34)

___

### modified

• **modified**: Date

The file last modified

Defined in: [fs.ts:28](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L28)

___

### size

• **size**: *number*

The file size

Defined in: [fs.ts:31](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L31)

___

### url

• **url**: *string*

Defined in: [fs.ts:25](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L25)

___

### version

• **version**: *string* \| *number*

Content hash for local file, and `metadata.generation` for GCP

Defined in: [fs.ts:37](https://github.com/wholebuzz/fs/blob/master/src/fs.ts#L37)
