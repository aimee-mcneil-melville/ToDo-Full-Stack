import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_CART
} from '../actions/cart'

function cart (state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return getNewCart(state, action.product)

    case DELETE_FROM_CART:
      return state.filter(item => item.id !== action.id)

    case UPDATE_CART:
      return getUpdatedCart(state, action.updateInfo)

    default:
      return state
  }
}
export default cart

//
// --- REDUCER HELPER FUNCTIONS ---
//
export function getNewCart (cart, product) {
  let exists = false
  const newCart = cart.map(item => {
    // If the id already exists, the quantity will be incremented.
    if (item.id === product.id) {
      item.quantity += 1
      exists = true
    }
    return item
  })

  if (exists) {
    return newCart
  } else {
    // If the id doesn't exist, it will be added with a quantity of 1.
    newCart.push({ ...product, quantity: 1 })
    return newCart
  }
}

export function getUpdatedCart (cart, updateInfo) {
  const { id, newQuantity } = updateInfo
  return cart.map(item => {
    const quantity = (item.id === id) ? Number(newQuantity) : item.quantity
    return { ...item, quantity }
  })
}
