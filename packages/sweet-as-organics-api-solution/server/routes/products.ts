import express from 'express'

import * as db from '../db/products'

const router = express.Router()

router.get('/', (req, res) => {
  db.listProducts()
    .then((products) => {
      res.json(products)
    })
    .catch((err) => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

export default router
