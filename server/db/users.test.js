const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const users = require('./users')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('getUserByName returns the correct user', () => {
  return users.getUserByName('admin', testDb)
    .then(user => {
      expect(user.username).toBe('admin')
      return expect(user.gardenId).toBe(1)
    })
})

test('createUser creates a new user', () => {
  const user = {
    username: 'new',
    password: 'hello',
    gardenId: 1
  }
  return users.createUser(user, testDb)
    .then(user => {
      return expect(user).toEqual([4])
    })
})

test('userExists returns true if user exists, otherwise returns false', () => {
  return users.userExists('admin', testDb)
    .then(bool => {
      return expect(bool).toBe(true)
    })
})
