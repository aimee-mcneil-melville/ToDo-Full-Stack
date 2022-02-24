import { getPosts } from './postsHelper'
import { SET_WAITING, CLEAR_WAITING } from '../../actions/waiting'
import { dispatch } from '../../store'

jest.mock('../../store')

afterEach(() => {
  return jest.resetAllMocks()
})

// eslint-disable-next-line no-template-curly-in-string
describe('-> GET /posts/${gardenId} api call success', () => {
  it('dispatches with the correct event action for admin', () => {
    function consume (path) {
      expect(path).toMatch('1')
      return Promise.resolve({
        body:
        {
          posts: [{
            id: 1,
            gardenId: 1,
            author: 2,
            title: 'Lettuce Picking Season',
            createdOn: '21/02/2022',
            content: 'test',
            firstName: 'User',
            lastName: 'second'
          }]
        }
      })
    }

    return getPosts(1, consume)
      .then((posts) => {
        expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
        expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_WAITING })
        expect(posts).toHaveLength(1)
        expect(posts[0].title).toBe('Lettuce Picking Season')
        expect(posts[0].createdOn).toBe('21/02/2022')
        expect(posts[0].firstName).toBe('User')
        expect(posts[0].lastName).toBe('second')
        expect(posts[0].content).toBe('test')
        return null
      })
  })
})
