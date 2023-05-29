import { test, expect, vi }  from 'vitest'
import { fetchSubreddit } from '../apis/reddit'
import * as actions from './reddit'

vi.mock('../apis/reddit')

const mockedFetchSubreddit = vi.mocked(fetchSubreddit)

test('fetchPosts', () => {
  mockedFetchSubreddit.mockResolvedValue([])
  const dispatch = vi.fn()

  return actions
    .fetchPosts('bananas')(dispatch, vi.fn())
    .then(() => {
      expect(dispatch.mock.calls).toHaveLength(2)
      expect(dispatch.mock.calls[0][0].type).toBe('REQUEST_POSTS')
      expect(dispatch.mock.calls[1][0].type).toBe('RECEIVE_POSTS')
      expect(mockedFetchSubreddit).toHaveBeenCalledWith('bananas')
    })
})
