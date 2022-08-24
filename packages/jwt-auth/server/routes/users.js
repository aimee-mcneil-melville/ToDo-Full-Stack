const express = require('express')
// TODO: import checkJwt

const db = require('../db/users')

const router = express.Router()

module.exports = router

// TODO: use checkJwt as middleware
// GET /api/v1/users
router.get('/', async (req, res) => {
  const auth0_id = req.user?.sub

  db.getUser(auth0_id)
    .then((user) => {
      res.json(user ? user : null)
    })
})

// TODO: use checkJwt as middleware
// POST /api/v1/users
router.post('/', async (req, res) => {
  const auth0_id = req.user?.sub
  const { username, icon } = req.body
  const userDetails = {
    auth0_id,
    username,
    icon,
  }

  try {
    const usernameTaken = await db.userExists(username)
    if (usernameTaken) throw new Error('Username Taken')
    await db.createUser(userDetails)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    if (err.message === 'Username Taken') {
      return res
        .status(403)
        .send('Username Taken')
    }
    res.status(500).send(err.message)
  }
})
