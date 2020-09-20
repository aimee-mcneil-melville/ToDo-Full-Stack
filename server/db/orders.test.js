const env = require('./testing/testEnv')
const db = require('./orders')

const { formatOrder, formatOrderList } = require('../formatter')
jest.mock('../formatter', () => {
  return {
    formatOrderList: jest.fn(),
    formatOrder: jest.fn()
  }
})

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})

afterEach(() => env.cleanup(testDb))

test('listOrders returns list of orderLines and calls formatOrderList', () => {
  formatOrderList.mockImplementation(orderLines => Promise.resolve(orderLines))

  return db.listOrders(testDb)
    .then(orderLines => {
      expect(formatOrderList).toHaveBeenCalled()
      expect(orderLines).toHaveLength(4)
      expect(orderLines[0]).toHaveProperty('quantity') // from 'orders_products'
      expect(orderLines[0]).toHaveProperty('status') // from 'orders'
      expect(orderLines[0]).toHaveProperty('name') // from 'products'
    })
})

test('addOrder adds to orders and orders_products correctly', () => {
  const order = [ { id: 1, quantity: 4 }, { id: 2, quantity: 2 } ]

  return db.addOrder(order, testDb)
    .then(ids => {
      return db.listOrders(testDb)
    })
    .then(orderLines => {
      expect(orderLines).toHaveLength(6)
      expect(orderLines[4].quantity).toBe(4)
    })
})

describe('editOrder', () => {
  it('updates order and returns updated order if order exists', () => {
    formatOrder.mockImplementation(orderLines => Promise.resolve(orderLines))
    const id = 2
    const orderChanges = { status: 'test status' }

    return db.editOrder(id, orderChanges, testDb)
      .then(orderLines => {
        expect(formatOrder).toHaveBeenCalled()
        expect(orderLines[0].status).toBe('test status')
      })
  })

  it('throws error if order not found', () => {
    expect.assertions(1)
    const id = 99
    const orderChanges = { status: 'test status' }

    return db.editOrder(id, orderChanges, testDb)
      .catch(err => {
        expect(err.message).toBe('Order not found')
      })
  })
})
