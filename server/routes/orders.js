const express = require('express')

const router = express.Router()

const db = require('../db/orders')

router.get('/', (req, res) => {
  db.listOrders()
    .then(orders => {
      res.json(orders)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/', (req, res) => {
  const order = req.body
  db.addOrder(order)
    .then(newOrder => {
      res.json(newOrder)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const order = req.body
  db.editOrder(id, order)
    .then(order => {
      res.json(order)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.removeOrder(id)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
