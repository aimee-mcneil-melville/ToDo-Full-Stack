export interface DatabaseRow {
  id?: number
  createdAt?: string
  updatedAt?: string
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
  products: { id: number; name: string; quantity: number }[]
}

export interface Order extends OrderCreate, Required<DatabaseRow> {}
export interface Product extends ProductCreate, Required<DatabaseRow> {}
export interface OrderProduct
  extends OrderProductCreate,
    Required<DatabaseRow> {}

export type CartItem = Pick<Product, 'id' | 'name'>

export interface CartItemWithQuantity extends CartItem {
  quantity: number
}
