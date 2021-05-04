const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./gardens')

// Prevent Jest from timing out (5s often isn't enough)
jest.setTimeout(10000)

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('getGardens', () => {
  it('returns the correct number of gardens', () => {
    return db.getGardens(testDb)
      .then((gardens) => {
        expect(gardens).toHaveLength(3)
        return null
      })
  })
})

describe('getGardenById', () => {
  it('returns the chosen garden, with events mapped correctly', () => {
    return db.getGardenById(1, testDb)
      .then(garden => {
        expect(garden.id).toBe(1)
        expect(garden.name).toBe('Kelmarna Gardens')
        expect(garden.events).toHaveLength(2)
        const event = garden.events[1]
        expect(event.id).toBe(3)
        expect(event.volunteersNeeded).toBe(4)
        return null
      })
  })
  it('returns the chosen garden, with empty events array when no events', () => {
    return db.getGardenById(2, testDb)
      .then(garden => {
        expect(garden.id).toBe(2)
        expect(garden.name).toBe('Kingsland Community Orchard')
        expect(garden.events).toHaveLength(0)
        return null
      })
  })
})
