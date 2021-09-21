const express = require('express')

const router = express.Router()

// public - an endpoint that anyone can access
router.get('/', (req, res) => {
  res.json({ message: 'I\'m a public endpoint, any one can access me.' })
})

module.exports = router
