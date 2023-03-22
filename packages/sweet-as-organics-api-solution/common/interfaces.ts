export interface DatabaseRow {
  id: number
  createdAt: string
  updatedAt: string
}

export interface OrderCreate {
  status: string
}

export interface ProductCreate {
  name: string
  description: string
  country: string
}

export interface OrderProductCreate {
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

export interface Order extends OrderCreate, DatabaseRow {}
export interface Product extends ProductCreate, DatabaseRow {}
export interface OrderProduct extends OrderProductCreate, DatabaseRow {}

export type CartItem = Pick<Product, 'id' | 'name'>

export interface CartItemWithQuantity extends CartItem {
  quantity: number
}
