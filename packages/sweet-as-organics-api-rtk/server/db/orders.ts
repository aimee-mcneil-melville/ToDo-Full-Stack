import connection from './connection'
import { FormattedOrder } from '../../common/Order'

import { formatOrder, formatOrderList } from '../formatter'
import { CartProduct } from '../../common/Cart'

interface OrderItem {
  id: number
  quantity: number
}

export function listOrders(db = connection): Promise<FormattedOrder[]> {
  return db('orders_products')
    .join('orders', 'orders_products.order_id', 'orders.id')
    .join('products', 'orders_products.product_id', 'products.id')
    .select(
      'products.id as productId',
      'orders.id as orderId',
      'quantity',
      'created_at as createdAt',
      'status',
      'name'
    )
    .then((orderLines) => formatOrderList(orderLines))
}

export function addOrder(orderRequest: CartProduct[], db = connection) {
  // remove item names from order (we have the id)
  const order: OrderItem[] = orderRequest.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
    }
  })

  const hasInvalidQuantity = order.some((item) => item.quantity === 0)
  if (hasInvalidQuantity) {
    return Promise.reject(
      new Error('INVALID ORDER: Quantity required for all items')
    )
  }
  // will only get here to insert if the order is valid
  const timestamp = new Date(Date.now())
  return db('orders')
    .insert({
      created_at: timestamp,
      status: 'pending',
    })
    .then(([id]) => addOrderLines(id, order, db))
}

export function addOrderLines(id: number, order: OrderItem[], db = connection) {
  const orderLines = order.map((item) => {
    return {
      order_id: id,
      product_id: item.id,
      quantity: item.quantity,
    }
  })
  return db('orders_products')
    .insert(orderLines)
    .then(() => null)
}

export function editOrderStatus(
  id: number,
  newStatus: string,
  db = connection
) {
  return orderExists(id, db)
    .then(() => {
      return db('orders').update({ status: newStatus }).where('id', id)
    })
    .then(() => findOrderById(id, db))
}

function orderExists(id: number, db = connection) {
  return db('orders')
    .where('id', id)
    .first()
    .then((order) => {
      if (!order) throw new Error('Order not found')
    })
}

function findOrderById(id: number, db = connection) {
  return db('orders_products')
    .join('orders', 'orders_products.order_id', 'orders.id')
    .join('products', 'orders_products.product_id', 'products.id')
    .select(
      'products.id as productId',
      'orders.id as orderId',
      'quantity',
      'created_at as createdAt',
      'status',
      'name'
    )
    .where('orders.id', id)
    .then(formatOrder)
}
