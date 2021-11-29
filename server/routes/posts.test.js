const request = require('supertest')

const server = require('../server')
// const db = require('../db/gardens')
// const dbUsers = require('../db/users')
// const auth0 = require('../routes/auth')
// const log = require('../logger')

// jest.mock('../logger')
// jest.mock('../db/gardens')
// jest.mock('../db/users')
jest.mock('../db/posts')
// jest.mock('../routes/auth')

const mockPost = {
  id: 1,
  garden_id: 1,
  author: 1,
  title: 'Test Post',
  content: 'This is a test post'
  // created_on: '' I think this should auto complete?
}

const mockPostsForGarden = [
  {
    id: 1,
    garden_id: 1,
    author: 1,
    title: 'Test Post',
    content: 'This is a test post',
    created_on: '29/11/2021' // not sure about this
  },
  {
    id: 2,
    garden_id: 1,
    author: 1,
    title: 'Test Post 2',
    content: 'This is test post 2',
    created_on: '29/11/2021' // not sure about this
  }
]

describe('GET /api/v1/posts/:gardenid', () => {
  // should this be garden_id?
  it('responds with blog posts for the specific garden', () => {
    db.getPostsByGardenId.mockImplementation(() => Promise.resolve(mockPostsForGarden))
    dbUsers.getUserById.mockImplementation(() => Promise.resolve({ auth0Id: 'auth0id|est' }))
    auth0.userHasAdminRole.mockImplementation(() => Promise.resolve(true))
    return request(server)
      .get('/api/v1/posts/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.posts).toEqual([mockPost])
        expect(res.body.posts).toHaveLength(2)
        return null
      })
  })

  it('responds with a 401 error when token is not provided?', () => {
    //expect.assertions(2) not sure what this line is doing, copied from gardens.test.js
  })

  it('responds with 500 and correct error object on DB error', () => {
    db.getPostsByGardenId.mockImplementation(() => Promise.reject(
      new Error('mock getPostsByGardenId error')
    ))
    return request(server)
      .get('/api/v1/posts/:gardenid')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        expect(log).toHaveBeenCalledWith('mock getPostsByGardenId error')
        expect(res.body.error.title).toBe('Unable to retrieve posts')
        return null
      })
  })
})
