import { allShardsFilename, isShardedFilename } from './util'

it('Should get all shards filename from shard filename', () => {
  const shardFilename = 'foo.dump-0000-of-0001.jsonl'
  const shardsFilename = allShardsFilename(shardFilename)
  expect(shardsFilename).toBe('foo.dump-SSSS-of-NNNN.jsonl')
  expect(!!isShardedFilename(shardsFilename)).toBe(true)
})
