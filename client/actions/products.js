export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

export const requestProducts = () => {
  return {
    type: REQUEST_PRODUCTS
  }
}

export const receiveProducts = products => {
  return {
    type: RECEIVE_PRODUCTS,
    products: products
  }
}
