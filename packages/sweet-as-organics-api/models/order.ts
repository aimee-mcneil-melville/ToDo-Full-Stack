import { CartItemWithQuantity } from './product'
import { DatabaseRow } from './utility'

export interface OrderData {
  status: string
}

export type OrderStatus = 'completed' | 'cancelled' | 'pending'

export interface OrderProductData {
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

export interface Order extends OrderData, DatabaseRow {}
export interface OrderProduct extends OrderProductData, DatabaseRow {}
