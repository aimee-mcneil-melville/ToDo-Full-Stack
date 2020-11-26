const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./event')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('getEvents returns the correct number of Events', () => {
    return db.getEvents(testDb)
      .then(events => {
        expect(events).toHaveLength(2)
        return null
      })
  })

test('addEvent return the insert', () => {
    return db.addEvent(testDb)

})