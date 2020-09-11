import products from './products'
import { FETCH_PRODUCTS_SUCCESS } from '../actions/products'
import mockProducts from '../testing/mockProducts'

test('returns products array on FETCH_PRODUCTS_SUCCESS', () => {
  const action = {
    type: FETCH_PRODUCTS_SUCCESS,
    products: mockProducts
  }
  const newState = products([], action)
  expect(newState).toHaveLength(3)
  expect(newState[1].description).toBe('snazzier product')
})

test('returns old state if action does not match', () => {
  const action = {
    type: 'RANDOM_TEST_ACTION_TYPE'
  }
  const newState = products(mockProducts, action)
  expect(newState).toBe(mockProducts)
})
