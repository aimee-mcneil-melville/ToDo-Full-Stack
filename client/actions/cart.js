export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'
export const UPDATE_CART = 'UPDATE_CART'

export const addToCart = product => {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const deleteFromCart = (id) => {
  return {
    type: DELETE_FROM_CART,
    id
  }
}

export const updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    cart
  }
}
