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
  test.skip('returns a list of 3 posts', () => {
    return db.getPosts(testDb).then((posts) => {
      expect(posts).toHaveLength(3)
      return null
    })
  })
})
