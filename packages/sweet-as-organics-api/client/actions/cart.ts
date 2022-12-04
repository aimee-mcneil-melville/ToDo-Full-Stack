export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'
export const UPDATE_CART = 'UPDATE_CART'

export interface UpdateInfo {
  newQuantity: number
  id: number
}

export type Action =
  | { type: typeof ADD_TO_CART; payload: { id: number; name: string } }
  | { type: typeof DELETE_FROM_CART; payload: number }
  | { type: typeof UPDATE_CART; payload: UpdateInfo }

export function addToCart(product: { id: number; name: string }): Action {
  return {
    type: ADD_TO_CART,
    payload: product,
  }
}

export function deleteFromCart(id: number): Action {
  return {
    type: DELETE_FROM_CART,
    payload: id,
  }
}

export function updateCart(updateInfo: UpdateInfo): Action {
  return {
    type: UPDATE_CART,
    payload: updateInfo,
  }
}
