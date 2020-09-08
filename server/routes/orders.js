const express = require('express')

const router = express.Router()

const db = require('../db/orders')

router.get('/', (req, res) => {
  db.listOrders()
    .then(orders => {
      res.json(orders)
    })
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.findOrder(id)
    .then(order => {
      res.json(order)
    })
})

router.post('/', (req, res) => {
  const order = req.body
  db.addOrder(order)
    .then(orders => {
      res.json(orders)
    })
})

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const order = req.body
  db.editOrder(id, order)
    .then(orders => {
      res.json(orders)
    })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.removeOrder(id)
    .then(orders => {
      res.json(orders)
    })
})

module.exports = router
