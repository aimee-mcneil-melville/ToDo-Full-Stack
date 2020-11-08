const knex = require('knex')
const config = require('./knexfile').test

const db = require('./db')
const testDb = knex(config)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())

test('getUsers gets all users', () => {
  // One for each letter of the alphabet
  const expected = 26
  return db.getUsers(testDb)
    .then((users) => {
      const actual = users.length
      expect(actual).toBe(expected)
      return null
    })
})

test('getUser gets a user by ID', () => {
  const expected = 'Ambitious Aardvark'
  return db.getUser(99901, testDb)
    .then((user) => {
      const actual = user.name
      expect(actual).toBe(expected)
      return null
    })
})
