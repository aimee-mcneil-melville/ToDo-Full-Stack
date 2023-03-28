import { CartProduct } from './Cart'

export interface FormattedOrder {
  id: number
  createdAt: string
  status: string
  products: CartProduct[]
}

export interface OrderDB {
  productId: number
  orderId: number
  quantity: number
  createdAt: number
  status: string
  name: string
}
