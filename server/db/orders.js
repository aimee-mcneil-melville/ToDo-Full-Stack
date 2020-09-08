const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

const { formatOrder, formatOrderList } = require('../formatter')

function listOrders (db = connection) {
  return db('orders_products')
    .join('orders', 'orders_products.order_id', 'orders.id')
    .join('products', 'orders_products.product_id', 'products.id')
    .select('products.id as productId', 'orders.id as orderId', 'quantity',
      'created_at as createdAt', 'updated_at as updatedAt', 'name')
    .then(formatOrderList)
}

function findOrder (orderId, db = connection) {
  return db('orders_products')
    .join('orders', 'orders_products.order_id', 'orders.id')
    .join('products', 'orders_products.product_id', 'products.id')
    .where('orders.id', orderId)
    .select('products.id as productId', 'orders.id as orderId', 'quantity',
      'created_at as createdAt', 'updated_at as updatedAt', 'name')
    .then(formatOrder)
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
}

function addOrder (order, db = connection) {
  const timestamp = new Date(Date.now())
  return db('orders').insert({
    created_at: timestamp,
    updated_at: timestamp
  })
    .then(([id]) => addOrderLines(id, order, db))
    .then(() => listOrders(db))
}

function editOrder (id, order, db = connection) {
  return db('orders')
    .update({ updated_at: new Date(Date.now()) })
    .where('id', id)
    .then(() => {
      return db('orders_products')
        .where('order_id', id)
        .del()
    })
    .then(() => addOrderLines(id, order, db))
    .then(() => listOrders(db))
}

function removeOrder (orderId, db = connection) {
  return db('orders_products')
    .where('order_id', orderId)
    .del()
    .then(() => {
      return db('orders')
        .where('id', orderId)
        .del()
    })
    .then(() => listOrders(db))
}

module.exports = {
  listOrders,
  findOrder,
  addOrder,
  editOrder,
  removeOrder
}
