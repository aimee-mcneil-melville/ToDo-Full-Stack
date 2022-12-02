import { Product } from '../../common/interfaces'
import { AppAction } from '../actions'
import { FETCH_PRODUCTS_SUCCESS, isProductAction } from '../actions/products'

const initialState: Product[] = []

function products(state = initialState, action: AppAction) {
  if (!isProductAction(action)) return state

  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return action.payload.products

    default:
      return state
  }
}

export default products
