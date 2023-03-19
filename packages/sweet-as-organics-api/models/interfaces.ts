export interface DatabaseRow {
  id: number
  createdAt: string
  updatedAt: string
}

export interface NewOrder {
  status: string
}

export interface NewProduct {
  name: string
  description: string
  country: string
}

export interface NewOrderProduct {
  orderId: number
  productId: number
  quantity: number
}

export type OrderStatus = 'completed' | 'cancelled' | 'pending'

export interface OrderWithProducts {
  id: number
  status: OrderStatus
  createdAt: string
  products: CartItemWithQuantity[]
}

export interface Order extends NewOrder, DatabaseRow {}
export interface Product extends NewProduct, DatabaseRow {}
export interface OrderProduct extends NewOrderProduct, DatabaseRow {}

export type CartItem = Pick<Product, 'id' | 'name'>

export interface CartItemWithQuantity extends CartItem {
  quantity: number
}
