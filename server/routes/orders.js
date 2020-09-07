const express = require('express')

const router = express.Router()

const db = require('../db/orders')
const { formatOrderList, formatOrder } = require('../formatter')

router.get('/', (req, res) => {
  db.listOrders()
    .then(orders => {
      const orderList = formatOrderList(orders)
      res.json(orderList)
    })
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.findOrder(id)
    .then(orderLines => {
      const order = formatOrder(orderLines)
      res.json(order)
    })
})

router.post('/', (req, res) => {
  const order = req.body
  db.addOrder(order)
    .then(orders => {
      const orderList = formatOrderList(orders)
      res.json(orderList)
    })
})

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const order = req.body
  db.editOrder(id, order)
    .then(orders => {
      const orderList = formatOrderList(orders)
      res.json(orderList)
    })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.removeOrder(id)
    .then(orders => {
      const orderList = formatOrderList(orders)
      res.json(orderList)
    })
})

module.exports = router
