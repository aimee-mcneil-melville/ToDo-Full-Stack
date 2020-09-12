import nock from 'nock'

import { url, fetchProducts } from './api'
import mockProducts from './testing/mockProducts'

describe('fetchProducts', () => {
  it('hits products get route, returns products on success', () => {
    expect.assertions(1)
    nock(url)
      .get('/api/v1/products')
      .reply(200, mockProducts)

    return fetchProducts()
      .then(res => {
        expect(res).toHaveLength(3)
      })
  })

  it('throws error on api call failure', () => {
    expect.assertions(1)
    nock(url)
      .get('/api/v1/products')
      .replyWithError({ code: 500, message: 'mock error message' })

    return fetchProducts()
      .catch(err => {
        expect(err.message).toBe('mock error message')
      })
  })
})
