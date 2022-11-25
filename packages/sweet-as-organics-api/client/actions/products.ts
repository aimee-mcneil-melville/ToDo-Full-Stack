import { getProducts } from '../api/products'
import { showError } from '../actions/error'
import type { AppThunkAction } from '../store'
import { Product } from '../../common/Product'

export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'

export type Action =
  | { type: typeof FETCH_PRODUCTS_PENDING; payload: unknown }
  | { type: typeof FETCH_PRODUCTS_SUCCESS; payload: Product[] }

export function fetchProductsPending(): Action {
  return {
    type: FETCH_PRODUCTS_PENDING,
    payload: undefined,
  }
}

export function fetchProductsSuccess(products: Product[]): Action {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  }
}

export function fetchProducts(): AppThunkAction {
  return (dispatch) => {
    dispatch(fetchProductsPending())
    return getProducts()
      .then((products) => {
        dispatch(fetchProductsSuccess(products))
      })
      .catch((err) => {
        // if the error is from our routes, this will use the message our route
        // sends back, rather than the generic 'Internal Server Error' from a
        // status 500
        // if the error is from elsewhere in the Promise chain, there won't be
        // an err.response object, so we use err.message
        const errMessage = err.response?.text || err.message
        dispatch(showError(errMessage))
      })
  }
}
