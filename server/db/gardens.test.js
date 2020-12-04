const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./gardens')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('getGardens returns the correct number of gardens', () => {
  return db.getGardens(testDb)
    .then(gardens => {
      expect(gardens).toHaveLength(3)
      return null
    })
})

test('getGardenById returns the chosen garden', () => {
  return db.getGardenById(1, testDb)
    .then(garden => {
      expect(garden.id).toBe(1)
      expect(garden.name).toBe('Kelmarna Gardens')
      expect(garden.events).toHaveLength(2)
      return null
    })
})
