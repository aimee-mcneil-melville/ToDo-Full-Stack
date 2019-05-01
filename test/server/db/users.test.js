const testEnv = require('../setup-db')
const users = require('../../../server/db/users')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

test('createUser inserts a single user', () => {
  let expected = 1

  return users.createUser('new_user', 'New', 'User', 's3cr3t', testDb)
    .then(ids => {
      let actual = ids.length

      expect(actual).toEqual(expected)
    })
})

test('userExists finds existing user', () => {
  let expected = true

  return users.userExists('admin', testDb)
    .then(result => {
      let actual = result

      expect(actual).toEqual(expected)
    })
})

test('userExists does not find non-existant user', () => {
  let expected = false

  return users.userExists('not-a-username', testDb)
    .then(result => {
      let actual = result

      expect(actual).toEqual(expected)
    })
})

test('getUserByUsername finds existing user', () => {
  let expected = 'Admin'

  return users.getUserByUsername('admin', testDb)
    .then(user => {
      let actual = user.first_name

      expect(actual).toEqual(expected)
    })
})
