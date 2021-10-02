const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/users')

const router = express.Router()

module.exports = router

// use checkJwt as a middle
// POST /api/v1/fruits
router.post('/', checkJwt, async (req, res) => {
  const newUser = req.body
  const { auth0Id, email } = newUser
  const user = {
    auth0_id: auth0Id,
    email
  }
  try {
    await db.createUser(user)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})
