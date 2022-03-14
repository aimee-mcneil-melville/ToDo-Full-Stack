const express = require('express')
const jwtAuthz = require('express-jwt-authz')
const { getUserRoles, checkJwt } = require('../auth0')

const db = require('../db/users')
const router = express.Router()

// middleware for checking permissions (authorization)
const checkAdmin = jwtAuthz(['read:my_private_route'], {
  customScopeKey: 'permissions',
})

// POST /api/v1/users/protected
router.post('/', async (req, res) => {
  const { auth0Id, name, email, description } = req.body
  const user = { auth0Id, name, email, description }

  try {
    await db.addUser(user)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'unable to insert user into the database' })
  }
})

// public - an endpoint that anyone can access
// GET /api/v1/users/public
router.get('/public', (req, res) => {
  res.json({ message: "I'm a public endpoint, any one can access me." })
})

// protected - an endpoint that can be accessed by authenticated users
// GET /api/v1/users/protected
router.get('/protected', checkJwt, (req, res) => {
  res.json({
    message: "I'm a protected route, only authenticated users can access me.",
  })
})

// private - an endpoint that can be accessed by users who have certain permissions
// GET /api/v1/users/private
router.get('/private', checkJwt, checkAdmin, (req, res) => {
  res.json({
    message:
      "I'm a private route, only authorized users with 'read:my_private_route' can access me.",
  })
})

// GET /api/v1/users/
router.get('/', (req, res) => {
  db.getUsers()
    .then((users) => {
      res.json({ users })
      return null
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

// GET /api/v1/users/auth0|12334
router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const roles = await getUserRoles(id)
    res.json({ roles })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to retrieve user roles' })
  }
})

module.exports = router
