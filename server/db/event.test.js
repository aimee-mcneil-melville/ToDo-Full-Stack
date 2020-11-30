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

test('getEventById returns the chosen Event', () => {
  return db.getEventById(2, testDb)
    .then(event => {
      expect(event.id).toBe(2)
      expect(event.title).toBe('Sowing Corn')
      expect(event.volunteers_needed).toBe(4)
      return null
    })
})

test('addEvent inserts one new event', () => {
  const actual = {
    gardenId: 1,
    title: 'Gardens of Testers',
    date: 'Wed, 27 Sep 2020 20:00:00 GMT',
    description: 'Testing',
    volunteersNeeded: 6
  }
  return db.addEvent(actual, testDb)
    .then(event => {
      expect(event.title).toBe('Gardens of Testers')
      expect(event.volunteersNeeded).toBe(6)
      return null
    })
})
