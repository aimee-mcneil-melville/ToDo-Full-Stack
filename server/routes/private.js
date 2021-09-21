const express = require('express')
const checkJwt = require('../auth0')
const jwtAuthz = require('express-jwt-authz')

const router = express.Router()

const checkAdmin = jwtAuthz(['read:my_private_route'], { customScopeKey: 'permissions' })

// private - an endpoint that can be accessed by users who have certain permissions
router.get('/', checkJwt, checkAdmin, (req, res) => {
  res.json({ message: 'I\'m a private route, only authorized users with \'read:my_private_route\' can access me.' })
})

module.exports = router
