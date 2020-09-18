const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

let db = require('./index')

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
    })
})

test('getUserGarden returns the chosen garden', () => {
  return db.getUserGarden(1, testDb)
    .then(garden => {
        console.log(garden)
      expect(garden.id).toBe(1)
      expect(garden.name).toBe('Kelmarna Gardens')
    })
})
