import { test, expect, vi }  from 'vitest'
import { fetchSubreddit } from '../apis/reddit.ts'
import * as actions from './reddit.ts'

vi.mock('../apis/reddit.ts')

const mockedFetchSubreddit = vi.mocked(fetchSubreddit)

test('fetchPosts', async () => {
  mockedFetchSubreddit.mockResolvedValue([])
  const dispatch = vi.fn()

  await actions
    .fetchPosts('bananas')(dispatch, vi.fn())
  expect(dispatch.mock.calls).toHaveLength(2)
  expect(dispatch.mock.calls[0][0].type).toBe('REQUEST_POSTS')
  expect(dispatch.mock.calls[1][0].type).toBe('RECEIVE_POSTS')
  expect(mockedFetchSubreddit).toHaveBeenCalledWith('bananas')
})
