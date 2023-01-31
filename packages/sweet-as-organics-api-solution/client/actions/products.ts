import { AppAction } from '.'
import { Product } from '../../common/interfaces'
import { getProducts } from '../api/products'
import { AppThunkAction } from '../store'
import { showError } from './error'

export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'

export type ProductAction =
  | { type: typeof FETCH_PRODUCTS_PENDING }
  | { type: typeof FETCH_PRODUCTS_SUCCESS; payload: { products: Product[] } }

export const isProductAction = (action: AppAction): action is ProductAction => {
  return action.type.includes('_PRODUCTS_')
}

export function fetchProductsPending(): ProductAction {
  return {
    type: FETCH_PRODUCTS_PENDING,
  }
}
export function fetchProductsSuccess(products: Product[]): ProductAction {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products: products },
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
