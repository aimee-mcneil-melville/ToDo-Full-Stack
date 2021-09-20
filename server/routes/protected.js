const express = require('express')
const checkJwt = require('../auth0')

const router = express.Router()

router.get('/', checkJwt, (req, res) => {
  res.json({ message: 'I\'m a protected route, only authenticated users can access me.' })
})

module.exports = router