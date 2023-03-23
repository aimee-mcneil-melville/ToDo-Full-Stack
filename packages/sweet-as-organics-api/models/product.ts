import { DatabaseRow } from './utility'

export interface ProductData {
  name: string
  description: string
  country: string
}

export interface Product extends ProductData, DatabaseRow {}

export type CartItem = Pick<Product, 'id' | 'name'>

export interface CartItemWithQuantity extends CartItem {
  quantity: number
}
