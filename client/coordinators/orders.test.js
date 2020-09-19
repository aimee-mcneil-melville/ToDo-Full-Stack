import { placeOrder, getOrders, updateOrder } from './orders'

import mockCart from '../testing/mockCart'
import mockOrders from '../testing/mockOrders'

describe('placeOrder', () => {
  it('creates order, dispatches and redirects correctly on success', () => {
    let history = []
    const dispatchers = {
      postOrderPending: jest.fn(),
      postOrderSuccess: jest.fn()
    }
    const consume = jest.fn(() => Promise.resolve())

    return placeOrder(mockCart, history, dispatchers, consume)
      .then(() => {
        const order = consume.mock.calls[0][2]
        expect(order).toHaveLength(3)
        expect(order[0]).not.toHaveProperty('name')
        expect(dispatchers.postOrderPending).toHaveBeenCalled()
        expect(dispatchers.postOrderSuccess).toHaveBeenCalled()
        expect(history).toHaveLength(1)
      })
  })

  it('dispatches error if order is invalid', () => {
    const cart = [ { id: 1, name: 'mock cart item', quantity: 0 } ]
    const history = []
    const dispatchers = {
      postOrderPending: jest.fn(),
      showError: jest.fn()
    }
    const consume = () => Promise.resolve()

    return placeOrder(cart, history, dispatchers, consume)
      .then(() => {
        const errorMessage = dispatchers.showError.mock.calls[0][0]
        expect(dispatchers.postOrderPending).toHaveBeenCalled()
        expect(errorMessage).toMatch('Invalid order')
        expect(history).toHaveLength(0)
      })
  })

  it('dispatches error on consume failure', () => {
    const history = []
    const dispatchers = {
      postOrderPending: jest.fn(),
      showError: jest.fn()
    }
    const consume = () => Promise.reject(new Error('mock bad thing'))

    return placeOrder(mockCart, history, dispatchers, consume)
      .then(() => {
        expect(dispatchers.postOrderPending).toHaveBeenCalled()
        expect(dispatchers.showError).toHaveBeenCalledWith('mock bad thing')
        expect(history).toHaveLength(0)
      })
  })
})

describe('getOrders', () => {
  it('dispatches correctly on success', () => {
    const dispatchers = {
      fetchOrdersPending: jest.fn(),
      fetchOrdersSuccess: jest.fn()
    }
    const consume = () => Promise.resolve({ body: mockOrders })

    return getOrders(dispatchers, consume)
      .then(() => {
        expect(dispatchers.fetchOrdersPending).toHaveBeenCalled()
        expect(dispatchers.fetchOrdersSuccess).toHaveBeenCalledWith(mockOrders)
      })
  })

  it('dispatches error on failure', () => {
    const dispatchers = {
      fetchOrdersPending: jest.fn(),
      showError: jest.fn()
    }
    const consume = () => Promise.reject(new Error('mock bad thing'))

    return getOrders(dispatchers, consume)
      .then(() => {
        expect(dispatchers.fetchOrdersPending).toHaveBeenCalled()
        expect(dispatchers.showError).toHaveBeenCalledWith('mock bad thing')
      })
  })
})

describe('updateOrder', () => {
  it('dispatches correctly on success', () => {
    const id = 1
    const orderChanges = { status: 'cancelled' }
    const dispatchers = {
      patchOrderPending: jest.fn(),
      patchOrderSuccess: jest.fn()
    }
    const consume = () => Promise.resolve({ body: mockOrders[0] })

    return updateOrder(id, orderChanges, dispatchers, consume)
      .then(() => {
        expect(dispatchers.patchOrderPending).toHaveBeenCalled()
        expect(dispatchers.patchOrderSuccess).toHaveBeenCalledWith(mockOrders[0])
      })
  })

  it('dispatches error on failure', () => {
    const id = 1
    const orderChanges = { status: 'cancelled' }
    const dispatchers = {
      patchOrderPending: jest.fn(),
      showError: jest.fn()
    }
    const consume = () => Promise.reject(new Error('mock bad thing'))

    return updateOrder(id, orderChanges, dispatchers, consume)
      .then(() => {
        expect(dispatchers.patchOrderPending).toHaveBeenCalled()
        expect(dispatchers.showError).toHaveBeenCalledWith('mock bad thing')
      })
  })
})
