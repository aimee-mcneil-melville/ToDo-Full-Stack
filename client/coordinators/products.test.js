import { getProducts } from './products'

import mockProducts from '../testing/mockProducts'

describe('getProducts', () => {
  it('dispatches correctly on success', () => {
    const dispatchers = {
      fetchProductsPending: jest.fn(),
      fetchProductsSuccess: jest.fn()
    }
    const consume = () => Promise.resolve({ body: mockProducts })

    return getProducts(dispatchers, consume)
      .then(() => {
        expect(dispatchers.fetchProductsPending).toHaveBeenCalled()
        expect(dispatchers.fetchProductsSuccess).toHaveBeenCalledWith(mockProducts)
      })
  })

  it('dispatches error on failure', () => {
    const dispatchers = {
      fetchProductsPending: jest.fn(),
      showError: jest.fn()
    }
    const consume = () => Promise.reject(new Error('mock bad thing'))

    return getProducts(dispatchers, consume)
      .then(() => {
        expect(dispatchers.fetchProductsPending).toHaveBeenCalled()
        expect(dispatchers.showError).toHaveBeenCalledWith('mock bad thing')
      })
  })
})
