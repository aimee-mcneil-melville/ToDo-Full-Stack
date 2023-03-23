import { CartItemWithQuantity } from './product'
import { DatabaseRow } from './utility'

export interface NewOrder {
  status: string
}

export type OrderStatus = 'completed' | 'cancelled' | 'pending'

export interface NewOrderProduct {
  orderId: number
  productId: number
  quantity: number
}

export interface OrderWithProducts {
  id: number
  status: OrderStatus
  createdAt: string
  products: CartItemWithQuantity[]
}

export interface Order extends NewOrder, DatabaseRow {}
export interface OrderProduct extends NewOrderProduct, DatabaseRow {}
