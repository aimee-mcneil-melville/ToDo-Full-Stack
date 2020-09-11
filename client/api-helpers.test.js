import {
  getProducts,
  getOrders,
  addOrder,
  updateOrder
} from './api-helpers'
import * as api from './api'

import mockProducts from './testing/mockProducts'
import mockOrders from './testing/mockOrders'

jest.mock('./api', () => {
  return {
    fetchProducts: jest.fn(),
    fetchOrders: jest.fn(),
    postOrder: jest.fn(),
    patchOrder: jest.fn()
  }
})

jest.mock('./actions/error', () => {
  return {
    showError: (errMessage) => {
      expect(errMessage).toBe('mocked rejection')
      return 'mocked error action'
    }
  }
})

jest.mock('./actions/products', () => {
  return {
    fetchProductsPending: () => 'mocked products pending action',
    fetchProductsSuccess: (products) => {
      expect(products).toHaveLength(3)
      return 'mocked products success action'
    }
  }
})

jest.mock('./actions/orders', () => {
  return {
    fetchOrdersPending: () => 'mocked orders pending action',
    fetchOrdersSuccess: (orders) => {
      expect(orders).toHaveLength(3)
      return 'mocked orders success action'
    },
    postOrderPending: () => 'mocked post order pending action',
    postOrderSuccess: () => 'mocked post order success action',
    patchOrderPending: () => 'mocked patch order pending action',
    patchOrderSuccess: () => 'mocked patch order success action'
  }
})

describe('getProducts', () => {
  it('dispatches correctly when fetchProducts resolves', () => {
    expect.assertions(4)
    api.fetchProducts.mockImplementation(() => Promise.resolve(mockProducts))
    const dispatch = jest.fn()
    return getProducts(dispatch)
      .then(() => {
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith('mocked products pending action')
        expect(dispatch).toHaveBeenLastCalledWith('mocked products success action')
      })
  })

  it('dispatches correctly when fetchProducts rejects', () => {
    expect.assertions(4)
    api.fetchProducts.mockImplementation(() => {
      const error = new Error('mocked rejection')
      return Promise.reject(error)
    })
    const dispatch = jest.fn()
    return getProducts(dispatch)
      .then(() => {
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith('mocked products pending action')
        expect(dispatch).toHaveBeenLastCalledWith('mocked error action')
      })
  })
})

describe('addOrder', () => {
  it('dispatches correctly when addOrder resolves', () => {
    expect.assertions(4)
    api.postOrder.mockImplementation((order) => {
      expect(order.status).toBe('pending')
      return Promise.resolve()
    })
    const dispatch = jest.fn()
    return addOrder(mockOrders[1], dispatch)
      .then(() => {
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith('mocked post order pending action')
        expect(dispatch).toHaveBeenLastCalledWith('mocked post order success action')
      })
  })

  it('dispatches correctly when addOrder rejects', () => {
    expect.assertions(4)
    api.postOrder.mockImplementation(() => {
      const error = new Error('mocked rejection')
      return Promise.reject(error)
    })
    const dispatch = jest.fn()
    return addOrder(mockOrders[1], dispatch)
      .then(() => {
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith('mocked post order pending action')
        expect(dispatch).toHaveBeenLastCalledWith('mocked error action')
      })
  })
})

describe('getOrders', () => {
  it('dispatches correctly when fetchOrders resolves', () => {
    expect.assertions(4)
    api.fetchOrders.mockImplementation(() => Promise.resolve(mockOrders))
    const dispatch = jest.fn()
    return getOrders(dispatch)
      .then(() => {
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith('mocked orders pending action')
        expect(dispatch).toHaveBeenLastCalledWith('mocked orders success action')
      })
  })

  it('dispatches correctly when fetchOrders rejects', () => {
    expect.assertions(4)
    api.fetchOrders.mockImplementation(() => {
      const error = new Error('mocked rejection')
      return Promise.reject(error)
    })
    const dispatch = jest.fn()
    return getOrders(dispatch)
      .then(() => {
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith('mocked orders pending action')
        expect(dispatch).toHaveBeenLastCalledWith('mocked error action')
      })
  })
})

describe('updateOrder', () => {
  it('dispatches correctly when patchOrder resolves', () => {
    expect.assertions(5)
    api.patchOrder.mockImplementation((id, orderChanges) => {
      expect(id).toBe(1)
      expect(orderChanges.status).toBe('cancelled')
      return Promise.resolve()
    })
    const orderChanges = { status: 'cancelled' }
    const dispatch = jest.fn()
    return updateOrder(1, orderChanges, dispatch)
      .then(() => {
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith('mocked patch order pending action')
        expect(dispatch).toHaveBeenLastCalledWith('mocked patch order success action')
      })
  })

  it('dispatches correctly when patchOrder rejects', () => {
    expect.assertions(4)
    api.patchOrder.mockImplementation(() => {
      const error = new Error('mocked rejection')
      return Promise.reject(error)
    })
    const orderChanges = { status: 'cancelled' }
    const dispatch = jest.fn()
    return updateOrder(1, orderChanges, dispatch)
      .then(() => {
        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith('mocked patch order pending action')
        expect(dispatch).toHaveBeenLastCalledWith('mocked error action')
      })
  })
})
