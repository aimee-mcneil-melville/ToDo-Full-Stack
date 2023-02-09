import knex from 'knex'
import config from './knexfile'

const testDb = knex(config.test)

import { addWidget, delWidget, getWidgets, updateWidget } from './db'

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())
afterAll(() => testDb.destroy())

describe('getWidgets', () => {
  it('returns the correct widgets array', () => {
    return getWidgets(testDb).then((widgets) => {
      expect(widgets).toHaveLength(3)
      expect(widgets[0]).toHaveProperty('mfg')
      expect(widgets[1].inStock).toBe(8)
    })
  })
})

describe('addWidget', () => {
  it('adds a widget to the database', () => {
    const newWidget = {
      name: 'Test Widget',
      price: 99.99,
      mfg: 'Test Mfg',
      inStock: 1,
      rating: 5,
    }
    return addWidget(newWidget, testDb)
      .then(() => getWidgets(testDb))
      .then((widgets) => {
        expect(widgets).toHaveLength(4)
        expect(widgets[3]).toMatchObject(newWidget)
      })
  })
})

describe('delWidget', () => {
  it('deletes a widget from the database', () => {
    return delWidget(1, testDb)
      .then(() => getWidgets(testDb))
      .then((widgets) => {
        expect(widgets).toHaveLength(2)
        expect(widgets[0].id).not.toBe(1)
      })
  })
})

describe('updateWidget', () => {
  it('updates a widget in the database', () => {
    const updatedWidget = {
      name: 'Updated Widget',
      price: 99.99,
      mfg: 'Updated Mfg',
      inStock: 1,
      rating: 5,
    }
    return updateWidget(1, updatedWidget, testDb)
      .then(() => getWidgets(testDb))
      .then((widgets) => {
        expect(widgets[0]).toMatchObject(updatedWidget)
      })
  })
})
