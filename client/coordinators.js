import { showError } from './actions/error'
import { requestProducts, receiveProducts } from './actions/products'

import { fetchProducts } from './api'

export function getProducts (dispatch) {
  dispatch(requestProducts())
  fetchProducts()
    .then(products => {
      dispatch(receiveProducts(products))
    })
    .catch(err => {
      dispatch(showError(err.message))
    })
}
