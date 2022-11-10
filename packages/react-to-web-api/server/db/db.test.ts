import knex from 'knex'
const config = require('./knexfile').test
const testDb = knex(config)

import {getWidgets, TWidget} from './db'

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
    return getWidgets(testDb).then((widgets: TWidget[]) => {
      expect(widgets).toHaveLength(3)
      expect(widgets[0]).toHaveProperty('mfg')
      expect(widgets[1].inStock).toBe(8)
    })
  })
})
