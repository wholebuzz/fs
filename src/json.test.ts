import through2 from 'through2'
import StreamTree, { pumpWritable } from 'tree-stream'
import {
  pipeJSONLinesParser,
  pipeJSONParser,
  readJSON,
  readJSONHashed,
  readJSONLines,
  writeJSON,
  writeJSONLines,
} from './json'
import { LocalFileSystem } from './local'

const testObject = {
  foo: 'bar',
  baz: 'bat',
}

const testArray = [{ aaa: 'bbb' }, { ccc: 'ddd' }]

it('Should serialize JSON Object', async () => {
  const fs = new LocalFileSystem()
  const filename = '/tmp/serialize-json-testObject.json.gz'
  await writeJSON(fs, filename, testObject)
  const readObject = await readJSON(fs, filename)
  expect(readObject).toEqual(testObject)

  const [hashedObject, hash] = await readJSONHashed(fs, filename)
  expect(hashedObject).toEqual(testObject)
  expect(hash).toEqual(
    'b3dcdc852ccfa09fbc4beda6d7f10e5e03191443fcccf3f760cfffeb2aafa560c32eb0b3b936a10198a3749e525879d2139222b8d3acd82bff23d898cc9e63fa'
  )

  const streamedObject: Record<string, any> = {}
  const input = pipeJSONParser(await fs.openReadableFile(filename), false)
  const output = StreamTree.writable(
    through2.obj((data: any, _: string, callback: () => void) => {
      streamedObject[data.key] = data.value
      callback()
    })
  )
  await pumpWritable(output, undefined, input.finish())
  expect(streamedObject).toEqual(testObject)
})

it('Should serialize JSON Array', async () => {
  const fs = new LocalFileSystem()
  const filename = '/tmp/serialize-json-testArray.json.gz'
  await writeJSON(fs, filename, testArray)
  const readObject = await readJSON(fs, filename)
  expect(readObject).toEqual(testArray)

  const [hashedObject, hash] = await readJSONHashed(fs, filename)
  expect(hashedObject).toEqual(testArray)
  expect(hash).toEqual(
    '256c53df2c94c3313dc9c126c3e1675ac702ebdbb540c0b24550097f33cc67abfb0e7f0a15a678f3fe23dc6c886bb53f4918925c4b82d92477eeb8df26338a7e'
  )

  const streamedObject: unknown[] = []
  const input = pipeJSONParser(await fs.openReadableFile(filename), true)
  const output = StreamTree.writable(
    through2.obj((data: any, _: string, callback: () => void) => {
      streamedObject.push(data)
      callback()
    })
  )
  await pumpWritable(output, undefined, input.finish())
  expect(streamedObject).toEqual(testArray)
})

it('Should serialize JSON Array to JSON-lines', async () => {
  const fs = new LocalFileSystem()
  const filename = '/tmp/serialize-ndjson-testArray.json.gz'
  await writeJSONLines(fs, filename, testArray)
  const readObject = await readJSONLines(fs, filename)
  expect(readObject).toEqual(testArray)

  const streamedObject: unknown[] = []
  const input = pipeJSONLinesParser(await fs.openReadableFile(filename))
  const output = StreamTree.writable(
    through2.obj((data: any, _: string, callback: () => void) => {
      streamedObject.push(data)
      callback()
    })
  )
  await pumpWritable(output, undefined, input.finish())
  expect(streamedObject).toEqual(testArray)
})
