import { LocalFileSystem } from './fs'
import { readJSON, readJSONHashed, readJSONLines, writeJSON, writeJSONLines } from './json'

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
})

it('Should serialize JSON Array', async () => {
  const fs = new LocalFileSystem()
  const filename = '/tmp/serialize-json-testArray.json.gz'
  await writeJSON(fs, filename, testArray)
  const readObject = await readJSON(fs, filename)
  expect(readObject).toEqual(testArray)
})

it('Should serialize JSON Array to JSON-lines', async () => {
  const fs = new LocalFileSystem()
  const filename = '/tmp/serialize-ndjson-testArray.json.gz'
  await writeJSONLines(fs, filename, testArray)
  const readObject = await readJSONLines(fs, filename)
  expect(readObject).toEqual(testArray)
})
