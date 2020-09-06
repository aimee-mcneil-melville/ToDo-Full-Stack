const express = require('express')

const router = express.Router()

const db = require('../db/products')

router.get('/', (req, res) => {
  db.listProducts()
    .then(products => {
      res.json(products)
    })
    .catch(err => {
      res.send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
