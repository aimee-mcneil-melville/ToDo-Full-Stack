import { DatabaseRow } from './utility'

export interface NewProduct {
  name: string
  description: string
  country: string
}

export interface Product extends NewProduct, DatabaseRow {}

export type CartItem = Pick<Product, 'id' | 'name'>

export interface CartItemWithQuantity extends CartItem {
  quantity: number
}
