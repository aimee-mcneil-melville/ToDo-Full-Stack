import { AppAction } from '.'
import { Product } from '../../common/interfaces'
import { getProducts } from '../api/products'
<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/actions/products.ts
import { AppThunkAction } from '../store'
import { showError } from './error'
=======
import { showError } from '../actions/error'
import type { AppThunkAction } from '../store'
import { Product } from '../../common/Product'
>>>>>>> main:packages/sweet-as-organics-api/client/actions/products.ts

export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'

<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/actions/products.ts
export type ProductAction =
  | { type: typeof FETCH_PRODUCTS_PENDING }
  | { type: typeof FETCH_PRODUCTS_SUCCESS; payload: { products: Product[] } }

export const isProductAction = (action: AppAction): action is ProductAction => {
  return action.type.includes('_PRODUCTS_')
}

export function fetchProductsPending(): ProductAction {
=======
export type Action =
  | { type: typeof FETCH_PRODUCTS_PENDING; payload: unknown }
  | { type: typeof FETCH_PRODUCTS_SUCCESS; payload: Product[] }

export function fetchProductsPending(): Action {
>>>>>>> main:packages/sweet-as-organics-api/client/actions/products.ts
  return {
    type: FETCH_PRODUCTS_PENDING,
    payload: undefined,
  }
}

<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/actions/products.ts
export function fetchProductsSuccess(products: Product[]): ProductAction {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products: products },
=======
export function fetchProductsSuccess(products: Product[]): Action {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
>>>>>>> main:packages/sweet-as-organics-api/client/actions/products.ts
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
