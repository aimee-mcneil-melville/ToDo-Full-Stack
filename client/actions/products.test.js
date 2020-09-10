import {
  fetchProductsPending,
  fetchProductsSuccess,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS
} from './products'

import mockProducts from '../testing/mockProducts'

test('fetchProductsPending returns the correct action', () => {
  const action = fetchProductsPending()
  expect(action.type).toBe(FETCH_PRODUCTS_PENDING)
})

test('fetchProductsSuccess returns the correct action', () => {
  const action = fetchProductsSuccess(mockProducts)
  expect(action.type).toBe(FETCH_PRODUCTS_SUCCESS)
  expect(action.products).toHaveLength(3)
})
