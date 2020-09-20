const request = require('supertest')

const db = require('../db/products')
const server = require('../server')

const baseUrl = '/api/v1/products'

jest.mock('../db/products', () => {
  return {
    listProducts: jest.fn()
  }
})

const mockProducts = [
  {
    id: 1,
    name: 'mocked product 1',
    description: 'snazzy product',
    country: 'testlandia'
  },
  {
    id: 2,
    name: 'mocked product 2',
    description: 'snazzier product',
    country: 'testlandia'
  },
  {
    id: 3,
    name: 'mocked product 3',
    description: 'snazziest product',
    country: 'testlandia'
  }
]

describe('GET /api/v1/products', () => {
  it('responds with products array on success', () => {
    db.listProducts.mockImplementation(() => Promise.resolve(mockProducts))

    return request(server)
      .get(baseUrl + '/')
      .expect(200)
      .then(res => {
        expect(res.body).toHaveLength(3)
      })
  })

  it('responds with 500 on database error', () => {
    db.listProducts.mockImplementation(() => Promise.reject(new Error('mock error')))

    return request(server)
      .get(baseUrl + '/')
      .expect(500)
      .then(res => {
        expect(res.text).toBe('DATABASE ERROR: mock error')
      })
  })
})
