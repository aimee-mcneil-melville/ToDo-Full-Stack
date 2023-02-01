import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Beer } from '../components/BeerList'
import { RootState } from '../store'

// use Pick to create a new type that only has the properties we want + quantity
export type CartItem = Pick<Beer, 'id' | 'name'> & { quantity: number }

const initialState: CartItem[] = []

type AddToCartPayload = {
  cartItem: Pick<Beer, 'id' | 'name'>
}

type UpdateQuantityPayload = Pick<CartItem, 'id' | 'quantity'>

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      return [
        ...state.filter(
          (cartItem) => cartItem.id !== action.payload.cartItem.id
        ),
        {
          ...action.payload.cartItem,
          quantity:
            state
              .filter((carItem) => carItem.id === action.payload.cartItem.id)
              .map((cartItem) => cartItem.quantity)[0] + 1 || 1,
        },
      ]
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      return state.filter((item) => item.id !== action.payload.id)
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.quantity,
          }
        }
        return item
      })
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export const selectCart = (state: RootState) => state.cart
export default cartSlice.reducer
