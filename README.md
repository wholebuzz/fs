# @wholebuzz/fs

`FileSystem` with atomic primitives enabling multiple readers and writers.

- `LocalFileSystem` employs content hashing to approximate [GCS Object Versioning](https://cloud.google.com/storage/docs/object-versioning). 
- `GoogleCloudFileSystem` provides consistent parallel access paterns.
- `S3FileSystem` provides basic file system primitives.

# Example

```
import { AnyFileSystem, GoogleCloudFileSystem, LocalFileSystem, S3FileSystem } from '@wholebuzz/fs'
import { readJSON, writeJSON } from '@whilebuzz/fs/lib/json'

const fs = new AnyFileSystem([
  { urlPrefix: 'gs://', fs: new GoogleCloudFileSystem() },
  { urlPrefix: 's3://', fs: new S3FileSystem() },
  { urlPrefix: '', fs: new LocalFileSystem() },
])

await writeJSON(fs, 's3://bucket/file', { foo: 'bar' })
const foobar = await readJSON(fs, 's3://bucket/file')
```

# CLI

```bash
yarn build
node lib/cli.js ls .
node lib/cli.js --help
```

## API Reference

[@wholebuzz/fs](docs/README.md) / Exports

# @wholebuzz/fs

## Table of contents

### Modules

- [cli](docs/modules/cli.md)
- [fs](docs/modules/fs.md)
- [gcp](docs/modules/gcp.md)
- [json](docs/modules/json.md)
- [s3](docs/modules/s3.md)
- [util](docs/modules/util.md)
