import { validateOrder, placeOrder, getOrders, updateOrder } from './orders'

import mockOrders from '../testing/mockOrders'

describe('validateOrder', () => {
  it('resolves when passed an order with valid quantities', () => {
    const validOrder = [ { id: 1, quantity: 3 }, { id: 2, quantity: 1 } ]
    return expect(validateOrder(validOrder)).resolves.toBeUndefined()
  })

  it('rejects when passed an order with invalid quantities', () => {
    const invalidOrder = [ { id: 1, quantity: 0 }, { id: 2, quantity: 1 } ]
    return validateOrder(invalidOrder)
      .catch(err => {
        expect(err.message).toMatch('Please enter a valid quantity')
      })
  })
})

describe('placeOrder', () => {
  it('dispatches and redirects correctly on success', () => {
    const order = [ { id: 1, quantity: 3 }, { id: 2, quantity: 1 } ]
    let history = []
    const dispatchers = {
      postOrderPending: jest.fn(),
      postOrderSuccess: jest.fn()
    }
    const validate = () => Promise.resolve()
    const consume = () => Promise.resolve()

    return placeOrder(order, history, dispatchers, validate, consume)
      .then(() => {
        expect(dispatchers.postOrderPending).toHaveBeenCalled()
        expect(dispatchers.postOrderSuccess).toHaveBeenCalled()
        expect(history).toHaveLength(1)
      })
  })

  it('dispatches error on validate failure', () => {
    const order = [ { id: 1, quantity: 3 }, { id: 2, quantity: 1 } ]
    const history = []
    const dispatchers = {
      postOrderPending: jest.fn(),
      showError: jest.fn()
    }
    const validate = () => Promise.reject(new Error('mock invalid error'))
    const consume = () => Promise.resolve()

    return placeOrder(order, history, dispatchers, validate, consume)
      .then(() => {
        expect(dispatchers.postOrderPending).toHaveBeenCalled()
        expect(dispatchers.showError).toHaveBeenCalledWith('mock invalid error')
      })
  })

  it('dispatches error on consume failure', () => {
    const order = [ { id: 1, quantity: 3 }, { id: 2, quantity: 1 } ]
    const history = []
    const dispatchers = {
      postOrderPending: jest.fn(),
      showError: jest.fn()
    }
    const validate = () => Promise.resolve()
    const consume = () => Promise.reject(new Error('mock bad thing'))

    return placeOrder(order, history, dispatchers, validate, consume)
      .then(() => {
        expect(dispatchers.postOrderPending).toHaveBeenCalled()
        expect(dispatchers.showError).toHaveBeenCalledWith('mock bad thing')
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
