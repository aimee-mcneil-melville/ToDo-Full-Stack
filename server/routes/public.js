const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'I\'m a public endpoint, any one can access me.' })
})

module.exports = router