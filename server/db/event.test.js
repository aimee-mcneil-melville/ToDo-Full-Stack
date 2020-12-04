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
      expect(event.volunteersNeeded).toBe(4)
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

test('updateEvent returns the updatedEvent', () => {
  // Updated event
  const updated = {
    id: 1,
    title: 'gardening at daves',
    date: 'Wed, 28 Sep 2020 20:00:00 GMT',
    description: 'Leshgoooooo!',
    volunteersNeeded: 10
  }

  return db.updateEvent(updated, testDb)
    .then(event => {
      expect(event.title).toBe('gardening at daves')
      expect(event.date).toBe('Wed, 28 Sep 2020 20:00:00 GMT')
      expect(event.description).toBe('Leshgoooooo!')
      expect(event.volunteersNeeded).toBe(10)
      return null
    })
})
