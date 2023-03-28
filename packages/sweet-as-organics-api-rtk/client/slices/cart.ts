import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CartProduct {
  id: number
  name: string
  quantity: number
}

const initialState = [] as CartProduct[]
type AddToCartPayload = Pick<CartProduct, 'id' | 'name'>
type UpdateCartPayload = { id: number; newQuantity: number }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      return getNewCart(state, action.payload)
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload)
    },
    updateCart: (state, action: PayloadAction<UpdateCartPayload>) => {
      const { id, newQuantity } = action.payload
      return state.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : { ...item }
      )
    },
  },
})

export const { addToCart, deleteFromCart, updateCart } = cartSlice.actions
export default cartSlice.reducer

//
// --- REDUCER HELPER FUNCTIONS ---
//
export function getNewCart(
  cart: CartProduct[],
  product: { id: number; name: string }
) {
  const cartWithoutItem = cart.filter((item) => item.id !== product.id)
  const itemInCart = cart.find((item) => item.id === product.id)
  if (itemInCart) {
    return cartWithoutItem.concat({
      ...itemInCart,
      quantity: itemInCart.quantity + 1,
    })
  }
  return cartWithoutItem.concat({
    ...product,
    quantity: 1,
  })
}

export function getUpdatedCart(
  cart: CartProduct[],
  { id, newQuantity }: UpdateCartPayload
) {
  return cart.map((item) =>
    item.id === id ? { ...item, quantity: newQuantity } : { ...item }
  )
}
