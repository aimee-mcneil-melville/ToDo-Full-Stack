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
    .then((gardens) => {
      expect(gardens).toHaveLength(3)
      expect(gardens[0]).toHaveProperty('id')
      expect(gardens[0]).toHaveProperty('name')
      expect(gardens[0]).toHaveProperty('address')
      expect(gardens[0]).toHaveProperty('description')
      expect(gardens[0]).toHaveProperty('lat')
      expect(gardens[0]).toHaveProperty('lon')
      expect(gardens[0]).toHaveProperty('url')
      return null
    })
})

describe('getGardenById', () => {
  it('returns the chosen garden, with events mapped correctly', () => {
    return db.getGardenById(1, testDb)
      .then(garden => {
        expect(garden.id).toBe(1)
        expect(garden.name).toBe('Kelmarna Gardens')
        expect(garden.description).toMatch('council land in Ponsonby')
        expect(garden.address).toMatch('Hukanui')
        expect(garden.lat).toBe(-36.86011508905973)
        expect(garden.lon).toBe(174.7330772002716)
        expect(garden.url).toMatch('www.kelmarnagardens')
        expect(garden.events).toHaveLength(2)
        const event = garden.events[1]
        expect(event.id).toBe(3)
        expect(event.volunteersNeeded).toBe(4)
        expect(event.description).toMatch('lovely corns')
        expect(event.datetime).toMatch('08-28')
        expect(event.title).toBe('Sowing Corn')
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
