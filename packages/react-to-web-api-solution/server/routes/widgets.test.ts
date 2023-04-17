import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/db'

vi.mock('../db/db')

const testWidgets = [
  {
    id: 1,
    name: 'test 1',
    price: 1.23,
    mfg: 'Test 1 Inc.',
    inStock: 4,
    rating: 1,
  },
  {
    id: 2,
    name: 'test 2',
    price: 45.67,
    mfg: 'Test 2 Inc.',
    inStock: 0,
    rating: 2,
  },
  {
    id: 3,
    name: 'test 3',
    price: 890.12,
    mfg: 'Test 3 Inc.',
    inStock: 8,
    rating: 4,
  },
]

const mockedGetWidgets = vi.mocked(db.getWidgets)

describe('GET /api/v1/widgets', () => {
  it('responds with widgets array on getWidgets success', () => {
    mockedGetWidgets.mockImplementation(() => Promise.resolve(testWidgets))
    return request(server)
      .get('/api/v1/widgets')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(3)
        expect(res.body[1].price).toBe(45.67)
      })
  })
  it('responds with 500 and error on getWidgets rejection', () => {
    mockedGetWidgets.mockImplementation(() =>
      Promise.reject(new Error('mock DB error'))
    )
    return request(server)
      .get('/api/v1/widgets')
      .expect(500)
      .then((err) => {
        expect(err.text).toBe('mock DB error')
      })
  })
})

describe('POST /api/v1/widgets', () => {
  const mockedAddWidget = vi.mocked(db.addWidget)
  it('responds with 200 on success and returns all of the widgets', () => {
    const newWidget = {
      name: 'test 4',
      price: 345.67,
      mfg: 'Test 4 Inc.',
      inStock: 4,
      rating: 3,
    }
    mockedAddWidget.mockResolvedValue([4])
    mockedGetWidgets.mockImplementation(() =>
      Promise.resolve([...testWidgets, { ...newWidget, id: 4 }])
    )
    return request(server)
      .post('/api/v1/widgets')
      .send(newWidget)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(4)
        expect(res.body[3].price).toBe(345.67)
      })
  })
  it('responds with 500 and error on addWidget rejection', () => {
    mockedAddWidget.mockImplementation(() =>
      Promise.reject(new Error('mock DB error'))
    )
    return request(server)
      .post('/api/v1/widgets')
      .send({
        name: 'test 4',
        price: 345.67,
        mfg: 'Test 4 Inc.',
        inStock: 4,
        rating: 3,
      })
      .expect(500)
      .then((err) => {
        expect(err.text).toBe('mock DB error')
      })
  })
})

describe('DELETE /api/v1/widgets/:id', () => {
  const mockedDelWidget = vi.mocked(db.delWidget)
  it('responds with 200 on success', () => {
    mockedDelWidget.mockResolvedValue([1])
    return request(server)
      .delete('/api/v1/widgets/1')
      .then((res) => {
        expect(res.status).toBe(200)
      })
  })
  it('responds with 500 and error on delWidget rejection', () => {
    mockedDelWidget.mockImplementation(() =>
      Promise.reject(new Error('mock DB error'))
    )
    return request(server)
      .delete('/api/v1/widgets/1')
      .expect(500)
      .then((err) => {
        expect(err.text).toBe('mock DB error')
      })
  })
})

describe('PATCH /api/v1/widgets/:id', () => {
  const mockedUpdateWidget = vi.mocked(db.updateWidget)
  it('responds with 200 on success and returns the updated widget', () => {
    const updatedWidget = {
      name: 'test 1',
      price: 1.23,
      mfg: 'Test 1 Inc.',
      inStock: 4,
      rating: 5,
    }

    mockedUpdateWidget.mockResolvedValue([1])

    return request(server)
      .patch('/api/v1/widgets/1')
      .send(updatedWidget)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ ...updatedWidget, id: 1 })
      })
  })

  it('responds with 500 and error on updateWidget rejection', () => {
    mockedUpdateWidget.mockImplementation(() =>
      Promise.reject(new Error('mock DB error'))
    )
    return request(server)
      .patch('/api/v1/widgets/1')
      .send({
        name: 'test 1',
        price: 1.23,
        mfg: 'Test 1 Inc.',
        inStock: 4,
        rating: 5,
      })
      .expect(500)
      .then((err) => {
        expect(err.text).toBe('mock DB error')
      })
  })
})
