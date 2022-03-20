import { allShardsFilename, isShardedFilename, isShardFilename, shardIndexOfFilename } from './util'

it('Should get all shards filename from shard filename', () => {
  const shardFilename = 'foo.dump-0000-of-0001.jsonl'
  const shardsFilename = allShardsFilename(shardFilename)
  expect(shardsFilename).toBe('foo.dump-SSSS-of-NNNN.jsonl')
  expect(!!isShardedFilename(shardsFilename)).toBe(true)
})

it('Should handle doubly sharded filenames', () => {
  const name =
    '/taskTracker/mr-user/jobcache/mr-job-1647726829979/work/shuffle-0000-of-0008.inputshard-0003-of-0004.jsonl.gz'
  expect(isShardFilename(name)).toBe(4)
  expect(shardIndexOfFilename(name)).toBe(3)
  expect(allShardsFilename(name)).toBe(
    '/taskTracker/mr-user/jobcache/mr-job-1647726829979/work/shuffle-0000-of-0008.inputshard-SSSS-of-NNNN.jsonl.gz'
  )
})
