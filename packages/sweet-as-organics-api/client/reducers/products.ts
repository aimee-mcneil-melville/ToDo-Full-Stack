import { FETCH_PRODUCTS_SUCCESS } from '../actions/products'
import type { Action } from '../actions'
import type { Product } from '../../common/Product'

const initialState = [] as Product[]

function products(state = initialState, action: Action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return action.payload

    default:
      return state
  }
}

export default products
