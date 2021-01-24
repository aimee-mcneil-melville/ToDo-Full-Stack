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

describe('getUserByName', () => {
  it('returns the correct user', () => {
    return users.getUserByName('admin', testDb)
      .then((user) => {
        expect(user.username).toBe('admin')
        expect(user.isAdmin).toBeTruthy()
        expect(user.gardenId).toBe(1)
        expect(user).toHaveProperty('hash')
        return null
      })
  })
})

describe('createUser', () => {
  it('creates a new user', () => {
    const user = {
      username: 'newuser',
      password: 'hello',
      gardenId: 3
    }
    return users.createUser(user, testDb)
      .then(() => users.getUserByName('newuser', testDb))
      .then((user) => {
        expect(user.username).toBe('newuser')
        expect(user.isAdmin).toBeFalsy()
        expect(user.gardenId).toBe(3)
        return null
      })
  })
})

describe('userExists', () => {
  it('returns true if user exists', () => {
    return users.userExists('admin', testDb)
      .then((exists) => {
        expect(exists).toBeTruthy()
        return null
      })
  })
  it('returns false if user not found', () => {
    return users.userExists('other-non-existent-user', testDb)
      .then((exists) => {
        expect(exists).toBeFalsy()
        return null
      })
  })
})
