const express = require('express')

const db = require('../db/fruits')

const router = express.Router()

router.get('/', (req, res) => {
  db.getFruits()
    .then((results) => {
      res.json({ fruits: results.map((fruit) => fruit.name) })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

module.exports = router
