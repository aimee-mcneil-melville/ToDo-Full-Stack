import { CartItem } from '../../models/product'

export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'
export const UPDATE_CART = 'UPDATE_CART'

export type CartAction =
  | { type: typeof ADD_TO_CART; payload: { product: CartItem } }
  | { type: typeof DELETE_FROM_CART; payload: { id: number } }
  | {
      type: typeof UPDATE_CART
      payload: { updateInfo: { id: number; newQuantity: number } }
    }

export function addToCart(product: CartItem): CartAction {
  return {
    type: ADD_TO_CART,
    payload: { product },
  }
}

export function deleteFromCart(id: number): CartAction {
  return {
    type: DELETE_FROM_CART,
    payload: { id },
  }
}

export function updateCart(updateInfo: {
  id: number
  newQuantity: number
}): CartAction {
  return {
    type: UPDATE_CART,
    payload: { updateInfo },
  }
}
