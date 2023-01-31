import { fetchSubreddit } from '../apis/reddit'
import * as actions from './reddit'

jest.mock('../apis/reddit')

const mockedFetchSubreddit = jest.mocked(fetchSubreddit)

test('fetchPosts', () => {
  mockedFetchSubreddit.mockResolvedValue([])
  const dispatch = jest.fn()

  return actions
    .fetchPosts('bananas')(dispatch, jest.fn())
    .then(() => {
      expect(dispatch.mock.calls).toHaveLength(2)
      expect(dispatch.mock.calls[0][0].type).toBe('REQUEST_POSTS')
      expect(dispatch.mock.calls[1][0].type).toBe('RECEIVE_POSTS')
      expect(mockedFetchSubreddit).toHaveBeenCalledWith('bananas')
    })
})
