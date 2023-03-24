import connection from './connection'

import { formatOrder, formatOrderList } from '../formatter'
import { Order, OrderWithProducts } from '../../models/order'

export function getAllOrders(db = connection): Promise<OrderWithProducts[]> {
  return db('orders_products')
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

export async function addOrder(
  orderRequest: { id: number; quantity: number }[],
  db = connection
): Promise<void> {
  const order = orderRequest.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }))

  const hasInvalidQuantity = order.some((item) => item.quantity === 0)
  if (hasInvalidQuantity) {
    return Promise.reject(
      new Error('INVALID ORDER: Quantity required for all items')
    )
  }

  const [{ id }] = await db<Order>('orders')

  if (!id) return Promise.reject(new Error('Order was not created'))

  await addOrderLines(id, order, db)
}

async function addOrderLines(
  id: number,
  order: { id: number; quantity: number }[],
  db = connection
): Promise<void> {
  const orderLines = order.map((item) => {
    return {
      order_id: id,
      product_id: item.id,
      quantity: item.quantity,
    }
  })
  return db('orders_products')
    .insert(orderLines)
    .then(() => undefined)
}

export async function updateOrderStatus(
  id: number,
  newStatus: 'pending' | 'cancelled' | 'success',
  db = connection
): Promise<OrderWithProducts> {
  await orderExists(id, db)
  await db('orders').update({ status: newStatus }).where('id', id)

  return findOrderById(id, db)
}

function orderExists(id: number, db = connection): Promise<boolean> {
  return db('orders')
    .where('id', id)
    .first()
    .then((order) => {
      if (!order) throw new Error('Order not found')
      return true
    })
}

function findOrderById(
  id: number,
  db = connection
): Promise<OrderWithProducts> {
  return db('orders_products')
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
