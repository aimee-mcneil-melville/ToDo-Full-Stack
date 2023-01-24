import { CartItem, CartItemWithQuantity } from '../../common/interfaces'
import { AppAction } from '../actions'
import { ADD_TO_CART, DELETE_FROM_CART, UPDATE_CART } from '../actions/cart'
import type { UpdateInfo } from '../actions/cart'
import type { Action } from '../actions/index'

<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/reducers/cart.ts
const initialState: CartItemWithQuantity[] = []

function cart(state = initialState, action: AppAction) {
  switch (action.type) {
    case ADD_TO_CART:
      return getNewCart(state, action.payload.product)

    case DELETE_FROM_CART:
      return state.filter((item) => item.id !== action.payload.id)

    case UPDATE_CART:
      return getUpdatedCart(state, action.payload.updateInfo)
=======
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
>>>>>>> main:packages/sweet-as-organics-api/client/reducers/cart.ts

    default:
      return state
  }
}
export default cart

//
// --- REDUCER HELPER FUNCTIONS ---
//
<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/reducers/cart.ts
export function getNewCart(cart: CartItemWithQuantity[], product: CartItem) {
=======
export function getNewCart(
  cart: CartProduct[],
  product: { id: number; name: string }
) {
>>>>>>> main:packages/sweet-as-organics-api/client/reducers/cart.ts
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
<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/reducers/cart.ts
  cart: CartItemWithQuantity[],
  updateInfo: { id: number; newQuantity: number }
) {
  const { id, newQuantity } = updateInfo
=======
  cart: CartProduct[],
  { id, newQuantity }: UpdateInfo
) {
>>>>>>> main:packages/sweet-as-organics-api/client/reducers/cart.ts
  return cart.map((item) => {
    if (item.id === id) {
      return { ...item, quantity: newQuantity }
    } else return item
  })
}
