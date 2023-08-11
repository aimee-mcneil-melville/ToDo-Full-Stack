// @vitest-environment node
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from './connection.ts'
import { addWidget, delWidget, getWidgets, updateWidget } from './db.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe.only('getWidgets', () => {
  it('returns the correct widgets array', async () => {
    const widgets = await getWidgets()

    expect(widgets).toHaveLength(3)
    expect(widgets[0]).toHaveProperty('mfg')
    expect(widgets[1].inStock).toBe(8)
  })
})

describe('addWidget', () => {
  it('adds a widget to the database', async () => {
    const newWidget = {
      name: 'Test Widget',
      price: 99.99,
      mfg: 'Test Mfg',
      inStock: 1,
      rating: 5,
    }

    await addWidget(newWidget)
    const widgets = await getWidgets()

    expect(widgets).toHaveLength(4)
    expect(widgets[3]).toMatchObject(newWidget)
  })
})

describe('delWidget', () => {
  it('deletes a widget from the database', async () => {
    await delWidget(1)
    const widgets = await getWidgets()
    expect(widgets).toHaveLength(2)
    expect(widgets[0].id).not.toBe(1)
  })
})

describe('updateWidget', () => {
  it('updates a widget in the database', async () => {
    const updatedWidget = {
      name: 'Updated Widget',
      price: 99.99,
      mfg: 'Updated Mfg',
      inStock: 1,
      rating: 5,
    }
    await updateWidget(1, updatedWidget)
    const widgets = await getWidgets()

    expect(widgets[0]).toMatchObject(updatedWidget)
  })
})
