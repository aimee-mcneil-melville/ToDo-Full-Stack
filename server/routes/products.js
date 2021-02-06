const express = require('express')

const db = require('../db/products')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  db.listProducts()
    .then((products) => {
      res.json(products)
      return null
    })
    .catch((err) => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})
