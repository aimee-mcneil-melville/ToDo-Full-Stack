const connection = require('./connection')

const { formatOrder, formatOrderList } = require('../formatter')

module.exports = {
  listOrders,
  addOrder,
  editOrderStatus
}

function listOrders (db = connection) {
  return db('orders_products')
    .join('orders', 'orders_products.order_id', 'orders.id')
    .join('products', 'orders_products.product_id', 'products.id')
    .select(
      'products.id as productId',
      'orders.id as orderId',
      'quantity',
      'created_at as createdAt',
      'status',
      'name')
    .then(formatOrderList)
}

function addOrder (orderRequest, db = connection) {
  // remove item names from order (we have the id)
  const order = orderRequest.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity
    }
  })

  const hasInvalidQuantity = order.some(item => item.quantity === 0)
  if (hasInvalidQuantity) {
    return Promise.reject(new Error('INVALID ORDER: Quantity required for all items'))
  }
  // will only get here to insert if the order is valid
  const timestamp = new Date(Date.now())
  return db('orders').insert({
    created_at: timestamp,
    status: 'pending'
  })
    .then(([id]) => addOrderLines(id, order, db))
}

function addOrderLines (id, order, db = connection) {
  const orderLines = order.map(item => {
    return {
      order_id: id,
      product_id: item.id,
      quantity: item.quantity
    }
  })
  return db('orders_products').insert(orderLines)
    .then(() => null)
}

function editOrderStatus (id, newStatus, db = connection) {
  return orderExists(id, db)
    .then(() => {
      return db('orders')
        .update({ status: newStatus })
        .where('id', id)
    })
    .then(() => findOrderById(id, db))
}

function orderExists (id, db = connection) {
  return db('orders')
    .where('id', id)
    .first()
    .then(order => {
      if (!order) throw new Error('Order not found')
      return null
    })
}

function findOrderById (id, db = connection) {
  return db('orders_products')
    .join('orders', 'orders_products.order_id', 'orders.id')
    .join('products', 'orders_products.product_id', 'products.id')
    .select(
      'products.id as productId',
      'orders.id as orderId',
      'quantity',
      'created_at as createdAt',
      'status',
      'name')
    .where('orders.id', id)
    .then(formatOrder)
}
