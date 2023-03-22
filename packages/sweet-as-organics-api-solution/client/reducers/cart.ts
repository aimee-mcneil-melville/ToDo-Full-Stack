import { CartItem, CartItemWithQuantity } from '../../common/interfaces'
import { AppAction } from '../actions'
import { ADD_TO_CART, DELETE_FROM_CART, UPDATE_CART } from '../actions/cart'

const initialState: CartItemWithQuantity[] = []

function cart(state = initialState, action: AppAction) {
  switch (action.type) {
    case ADD_TO_CART:
      return getNewCart(state, action.payload.product)

    case DELETE_FROM_CART:
      return state.filter((item) => item.id !== action.payload.id)

    case UPDATE_CART:
      return getUpdatedCart(state, action.payload.updateInfo)

    default:
      return state
  }
}
export default cart

//
// --- REDUCER HELPER FUNCTIONS ---
//
export function getNewCart(cart: CartItemWithQuantity[], product: CartItem) {
  let exists = false
  const newCart = cart.map((item) => {
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

export function getUpdatedCart(
  cart: CartItemWithQuantity[],
  updateInfo: { id: number; newQuantity: number }
) {
  const { id, newQuantity } = updateInfo
  return cart.map((item) => {
    if (item.id === id) {
      return { ...item, quantity: newQuantity }
    } else return item
  })
}
