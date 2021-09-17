const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./friends')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('ADD friend by followerId', () => {
  return db.addFriend(10002, 10005, testDb)
    .then(relationship => {
      console.log('relationship:', relationship)
      expect(relationship.id).toBe(8)
      return null
    })
})
