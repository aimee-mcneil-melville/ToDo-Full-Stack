const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./db')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('getPosts', () => {
  test('returns a list of 3 posts', () => {
    return db.getAllPosts(testDb).then((posts) => {
      expect(posts).toHaveLength(4)
    })
  })
})
