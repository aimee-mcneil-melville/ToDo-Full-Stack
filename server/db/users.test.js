const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const users = require('./users')

test('userExists returns true if user exists, otherwise returns false', () => {
  return users.userExists('Andras', testDb)
    .then(bool => {
      expect(bool).toBe(false)
    })
})

test('userExists returns true if user exists, otherwise returns false', () => {
  return users.userExists('benpai', testDb)
    .then(bool => {
      expect(bool).toBe(true)
    })
})
