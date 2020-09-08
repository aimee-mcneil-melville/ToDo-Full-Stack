import { FETCH_PRODUCTS_SUCCESS } from '../actions/products'

const products = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return action.products

    default:
      return state
  }
}

export default products
