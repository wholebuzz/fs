import StreamTree, { pumpWritable } from 'tree-stream'
import yargs from 'yargs'
import { AnyFileSystem } from './fs'
import { GoogleCloudFileSystem } from './gcp'
import { HTTPFileSystem } from './http'
import { LocalFileSystem } from './local'
import { S3FileSystem } from './s3'

async function main() {
  const httpFileSystem = new HTTPFileSystem()
  const fs = new AnyFileSystem([
    { urlPrefix: 'gs://', fs: new GoogleCloudFileSystem() },
    { urlPrefix: 's3://', fs: new S3FileSystem() },
    { urlPrefix: 'http://', fs: httpFileSystem },
    { urlPrefix: 'https://', fs: httpFileSystem },
    { urlPrefix: '', fs: new LocalFileSystem() },
  ])

  await yargs
    .strict()
    .options({
      verbose: { type: 'boolean' },
    })
    .help()
    .command(
      'cat <path>',
      'output contents of file',
      () => {
        /* */
      },
      async (args: Record<string, any>) => {
        const input = await fs.openReadableFile(args.path)
        const output = StreamTree.writable(process.stdout)
        return pumpWritable(output, undefined, input)
      }
    )
    .command(
      'cp <source> <target>',
      'copy source file to target',
      () => {
        /* */
      },
      async (args: Record<string, any>) => {
        const input = await fs.openReadableFile(args.source)
        const output = await fs.openWritableFile(args.target)
        return pumpWritable(output, undefined, input)
      }
    )
    .command(
      'ls <path> [prefix]',
      'list files',
      () => {
        /* */
      },
      async (args: Record<string, any>) => {
        const res = await fs.readDirectory(args.path, args.prefix)
        console.log(res)
      }
    )
    .command(
      'rm <path>',
      'remove file',
      () => {
        /* */
      },
      async (args: Record<string, any>) => {
        const res = await fs.removeFile(args.path)
        console.log(res)
      }
    )
    .command(
      'stat <path>',
      'get file status',
      () => {
        /* */
      },
      async (args: Record<string, any>) => {
        const res = await fs.getFileStatus(args.path)
        console.log(res)
      }
    )
    .command(
      'touch <path>',
      'create empty output file',
      () => {
        /* */
      },
      async (args: Record<string, any>) => {
        await fs.createFile(args.path)
      }
    )
    .command(
      'write <path>',
      'write stdin to output file',
      () => {
        /* */
      },
      async (args: Record<string, any>) => {
        const stream = await fs.openWritableFile(args.path)
        return pumpWritable(stream, undefined, StreamTree.readable(process.stdin))
      }
    ).argv
}

/* tslint:disable-next-line */
main()
