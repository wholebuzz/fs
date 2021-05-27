# @wholebuzz/fs

`FileSystem` with atomic primitives enabling multiple readers and writers.

- `LocalFileSystem` employs content hashing to approximate [GCS Object Versioning](https://cloud.google.com/storage/docs/object-versioning). 
- `GoogleCloudFileSystem` provides consistent parallel access paterns.

# Example

```
import { AnyFileSystem, GoogleCloudFileSystem, LocalFileSystem } from '@wholebuzz/fs'

const fs = new AnyFileSystem([
  { urlPrefix: 'gs://', fs: new GoogleCloudFileSystem() },
  { urlPrefix: '', fs: new LocalFileSystem() },
])

const localStream = fs.openReadableStream('/etc/hosts')
const cloudStreaam = fs.openReadableStream('gs://bucket/file')
```

## API Reference
