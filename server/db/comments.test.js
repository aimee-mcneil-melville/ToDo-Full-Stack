const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./comments')

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

describe('getCommentsByPostId', () => {
  it('returns all comments for a specific post', () => {
    return db.getCommentsByPostId(1, testDb)
      .then(comments => {
        expect(comments).toHaveLength(1)
        return null
      })
  })
})
