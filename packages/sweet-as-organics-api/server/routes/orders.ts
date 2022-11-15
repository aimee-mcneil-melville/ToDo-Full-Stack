import express from 'express'
import * as db from '../db/orders'

const router = express.Router()

export default router

router.get('/', (req, res) => {
  db.listOrders()
    .then((orders) => {
      console.log(orders)
      res.json(orders)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/', (req, res) => {
  const { cart } = req.body

  if (!Array.isArray(cart)) {
    return res.status(400).send('INVALID ORDER: cart must be an array')
  }

  db.addOrder(cart)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.sendStatus(400)
  const { status } = req.body

  const validStatuses = ['pending', 'cancelled', 'completed']
  if (!validStatuses.includes(status)) {
    return res
      .status(400)
      .send('INPUT ERROR: status must be one of ' + validStatuses.join(', '))
  }

  db.editOrderStatus(id, status)
    .then((updatedOrder) => {
      res.json(updatedOrder)
    })
    .catch((err) => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})
