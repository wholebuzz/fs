import { LocalFileSystem } from './local'
import { readableToArray } from './stream'

it('Should return same with readDirectory and readDirectoryStream', async () => {
  const fs = new LocalFileSystem()
  const dirname = __dirname
  const sorter = (a: any, b: any) => a.url.localeCompare(b.url)
  const urls = (await fs.readDirectory(dirname)).sort(sorter)
  expect((await readableToArray(await fs.readDirectoryStream(dirname))).sort(sorter)).toEqual(urls)
})

it('Should return same with readDirectory and readDirectoryStream { recursive: true }', async () => {
  const fs = new LocalFileSystem()
  const dirname = __dirname
  const options = { recursive: true }
  const sorter = (a: any, b: any) => a.url.localeCompare(b.url)
  const urls = (await fs.readDirectory(dirname, options)).sort(sorter)
  expect(
    (await readableToArray(await fs.readDirectoryStream(dirname, options))).sort(sorter)
  ).toEqual(urls)
})
