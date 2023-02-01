import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
} from '../actions/products'
import { SHOW_ERROR } from '../actions/error'
import type { AppAction } from '../actions'

function waiting(state = false, action: AppAction) {
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING:
      return true

    case FETCH_PRODUCTS_SUCCESS:
    case SHOW_ERROR:
      return false

    default:
      return state
  }
}

export default waiting
