import { getProducts } from '../api/products'
import { showError } from '../actions/error'

export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'

export function fetchProductsPending () {
  return {
    type: FETCH_PRODUCTS_PENDING
  }
}

export function fetchProductsSuccess (products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products: products
  }
}

export function fetchProducts () {
  return (dispatch) => {
    dispatch(fetchProductsPending())
    return getProducts()
      .then((products) => {
        dispatch(fetchProductsSuccess(products))
        return null
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}
