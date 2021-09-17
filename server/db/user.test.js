const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./user')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('getUser returns specific user', () => {
  return db.getUser(10001, testDb)
    .then(user => {
      expect(user.first_name).toBe('Jared')
      expect(user.last_name).toBe('Pinfold')
      expect(user.nickname).toBe('Daoloth69')
      return null
    })
})
