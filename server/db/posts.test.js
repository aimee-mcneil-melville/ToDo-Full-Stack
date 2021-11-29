const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./posts')

// Prevent Jest from timing out (5s often isn't enough)
jest.setTimeout(10000)

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getPostById', () => {
  it('returns the correct Post', () => {
    return db.getPostById(1, testDb)
      .then((post) => {
        expect(post.id).toBe(1)
        expect(post.gardenId).toBe(1)
        expect(post.author).toBe(2)
        expect(post.title).toMatch('Lettuce Picking Season')
        return null
      })
  })
})

describe('getAllPosts', () => {
  it('gets all of the posts in the db', () => {
    return db.getAllPosts(testDb)
      .then((posts) => {
        expect(posts).toHaveLength(2)
        return null
      })
  })
})
