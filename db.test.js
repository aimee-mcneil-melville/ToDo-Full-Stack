const knex = require('knex')
const testConfig = require('./knexfile').test
const testDb = knex(testConfig)

const db = require('./db')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('getUsers gets all users', () => {
  // One for each letter of the alphabet!
  return db.getUsers(testDb)
    .then(users => {
      expect(users).toHaveLength(26)
      return null
    })
})

test('getUser gets a single user', () => {
  return db.getUser(99901, testDb)
    .then(user => {
      expect(user.name).toBe('Ambitious Aardvark')
      return null
    })
})
