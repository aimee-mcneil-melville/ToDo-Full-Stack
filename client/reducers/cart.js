import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_CART } from '../actions/cart'

const cart = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return getNewCart(state, action.product)
    case DELETE_FROM_CART:
      return state.filter(item => item.id !== action.id)
    case UPDATE_CART:
      return action.cart
    default:
      return state
  }
}

/*
 * Returns a new cart array.
 * If the id already exists, the quantity will be incremented.
 * If the id doesn't exists, it will be added with a quantity of 1.
 */
function getNewCart (cart, product) {
  let exists = false
  const newCart = cart.map(item => {
    if (item.id === product.id) {
      item.quantity += 1
      exists = true
    }
    return item
  })

  if (exists) {
    return newCart
  } else {
    newCart.push({ ...product, quantity: 1 })
    return newCart
  }
}

export default cart
