import connection from './connection'

import { formatOrder, formatOrderList } from '../formatter'
import { Order, OrderProduct } from '../../common/interfaces'

export function listOrders(db = connection) {
  return db<OrderProduct>('orders_products')
    .join('orders', 'orders_products.order_id', 'orders.id')
    .join('products', 'orders_products.product_id', 'products.id')
    .select(
      'product_id as productId',
      'order_id as orderId',
      'quantity',
      'orders.created_at as createdAt',
      'status',
      'name'
    )
    .then(formatOrderList)
}

export function addOrder(
  orderRequest: { id: number; quantity: number }[],
  db = connection
) {
  const order = orderRequest.map((item) => {
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

  return db<Order>('orders')
    .insert({
      status: 'pending',
    })
    .returning('id')
    .then(([{ id }]) => {
      if (!id) throw new Error('Order was not created')
      addOrderLines(id, order, db)
    })
}

function addOrderLines(
  id: number,
  order: { id: number; quantity: number }[],
  db = connection
) {
  const orderLines = order.map((item) => {
    return {
      order_id: id,
      product_id: item.id,
      quantity: item.quantity,
    }
  })
  return db<OrderProduct>('orders_products')
    .insert(orderLines)
    .then(() => null)
}

export function editOrderStatus(
  id: number,
  newStatus: 'pending' | 'cancelled' | 'success',
  db = connection
) {
  return orderExists(id, db)
    .then(() => {
      return db<Order>('orders').update({ status: newStatus }).where('id', id)
    })
    .then(() => findOrderById(id, db))
}

function orderExists(id: number, db = connection) {
  return db<Order>('orders')
    .where('id', id)
    .first()
    .then((order) => {
      if (!order) throw new Error('Order not found')
      return true
    })
}

function findOrderById(id: number, db = connection) {
  return db<OrderProduct>('orders_products')
    .join('orders', 'orders_products.order_id', 'orders.id')
    .join('products', 'orders_products.product_id', 'products.id')
    .select(
      'product_id as productId',
      'order_id as orderId',
      'quantity',
      'orders.created_at as createdAt',
      'status',
      'name'
    )
    .where('orders.id', id)
    .orderBy('orders.id', 'asc')
    .then(formatOrder)
}
