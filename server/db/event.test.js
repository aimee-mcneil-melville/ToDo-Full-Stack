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

test('getEventById returns the chosen Event', () => {
  return db.getEventById(3, testDb)
    .then((event) => {
      expect(event.id).toBe(3)
      expect(event.gardenId).toBe(1)
      expect(event.title).toBe('Sowing Corn')
      expect(event.volunteersNeeded).toBe(4)
      expect(event).toHaveProperty('date')
      expect(event).toHaveProperty('description')
      return null
    })
})

test('addEvent inserts event correctly', () => {
  const newEvent = {
    gardenId: 2,
    title: 'Gardens of Testers',
    date: '2020-12-25',
    description: 'Christmas test gardening',
    volunteersNeeded: 6
  }
  return db.addEvent(newEvent, testDb)
    .then((event) => {
      expect(event.title).toBe('Gardens of Testers')
      expect(event.volunteersNeeded).toBe(6)
      expect(event.gardenId).toBe(2)
      expect(event.description).toMatch('Christmas')
      expect(event.date).toMatch('12-25')
      return null
    })
})

test('updateEvent returns the updatedEvent', () => {
  const updatedEvent = {
    id: 1,
    title: 'gardening at daves',
    date: '2020-12-01',
    description: 'Leshgoooooo!',
    volunteersNeeded: 10
  }

  return db.updateEvent(updatedEvent, testDb)
    .then(event => {
      expect(event.title).toBe('gardening at daves')
      expect(event.date).toBe('2020-12-01')
      expect(event.description).toBe('Leshgoooooo!')
      expect(event.volunteersNeeded).toBe(10)
      return null
    })
})
