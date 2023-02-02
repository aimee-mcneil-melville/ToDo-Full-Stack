import knex from 'knex'
import config from './knexfile'

const testDb = knex(config.test)

import { getWidgets } from './db'

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  testDb.destroy()
})

describe('getWidgets', () => {
  it('returns the correct widgets array', () => {
    return getWidgets(testDb).then((widgets) => {
      expect(widgets).toHaveLength(3)
      expect(widgets[0]).toHaveProperty('mfg')
      expect(widgets[1].inStock).toBe(8)
    })
  })
})
