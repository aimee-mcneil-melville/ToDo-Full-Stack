import { ADD_TO_CART, DELETE_FROM_CART, UPDATE_CART } from '../actions/cart'
import type { UpdateInfo } from '../actions/cart'
import type { Action } from '../actions/index'

interface CartProduct {
  id: number
  name: string
  quantity: number
}

const initialState = [] as CartProduct[]

function cart(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_TO_CART:
      return getNewCart(state, action.payload)

    case DELETE_FROM_CART:
      return state.filter((item) => item.id !== action.payload)

    case UPDATE_CART:
      return getUpdatedCart(state, action.payload)

    default:
      return state
  }
}
export default cart

//
// --- REDUCER HELPER FUNCTIONS ---
//
export function getNewCart(
  cart: CartProduct[],
  product: { id: number; name: string }
) {
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
  cart: CartProduct[],
  { id, newQuantity }: UpdateInfo
) {
  return cart.map((item) => {
    const quantity = item.id === id ? Number(newQuantity) : item.quantity
    return { ...item, quantity }
  })
}
