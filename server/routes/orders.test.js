const request = require('supertest')

const db = require('../db/orders')
const server = require('../server')

const baseUrl = '/api/v1/orders'

jest.mock('../db/orders', () => {
  return {
    listOrders: jest.fn(),
    addOrder: jest.fn(),
    editOrder: jest.fn()
  }
})

const mockOrders = [
  {
    id: 1,
    createdAt: '10:32:45 AM, Thu Sep 10 2020',
    status: 'cancelled',
    products: [
      {
        id: 1,
        name: 'snazzy product item',
        quantity: 3
      }
    ]
  },
  {
    id: 2,
    createdAt: '10:39:26 AM, Thu Sep 10 2020',
    status: 'pending',
    products: [
      {
        id: 2,
        name: 'snazzier product item',
        quantity: 1
      }
    ]
  }
]

describe('GET /api/v1/orders', () => {
  it('responds with orders array on success', () => {
    db.listOrders.mockImplementation(() => Promise.resolve(mockOrders))

    return request(server)
      .get(baseUrl + '/')
      .expect(200)
      .then(res => {
        expect(res.body).toHaveLength(2)
      })
  })

  it('responds with 500 on database error', () => {
    db.listOrders.mockImplementation(() => Promise.reject(new Error('mock error')))

    return request(server)
      .get(baseUrl + '/')
      .expect(500)
      .then(res => {
        expect(res.text).toBe('DATABASE ERROR: mock error')
      })
  })
})

describe('POST /api/v1/orders', () => {
  it('responds with 201 on add success', () => {
    const order = [ { id: 1, quantity: 4 }, { id: 2, quantity: 2 } ]
    db.addOrder.mockImplementation(() => Promise.resolve())

    return request(server)
      .post(baseUrl + '/')
      .send(order)
      .expect(201)
  })

  it('responds with 500 on database error', () => {
    db.addOrder.mockImplementation(() => Promise.reject(new Error('mock error')))

    return request(server)
      .post(baseUrl + '/')
      .expect(500)
      .then(res => {
        expect(res.text).toBe('DATABASE ERROR: mock error')
      })
  })
})

describe('PATCH /api/v1/orders/:id', () => {
  it('responds with order on success', () => {
    const orderChanges = { status: 'cancelled' }
    db.editOrder.mockImplementation(() => Promise.resolve(mockOrders[0]))

    return request(server)
      .patch(baseUrl + '/2')
      .send(orderChanges)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(mockOrders[0])
      })
  })

  it('responds with 500 on database error', () => {
    db.editOrder.mockImplementation(() => Promise.reject(new Error('mock error')))

    return request(server)
      .patch(baseUrl + '/99')
      .expect(500)
      .then(res => {
        expect(res.text).toBe('DATABASE ERROR: mock error')
      })
  })
})
