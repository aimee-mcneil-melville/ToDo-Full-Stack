const express = require('express')
// TODO: import checkJwt

const db = require('../db/users')
const router = express.Router()

// TODO: use checkJwt as middleware
// GET /api/v1/users
router.get('/', (req, res) => {
  const auth0_id = req.user?.sub

  if (!auth0_id) {
    res.send(null)
  } else {
    db.getUser(auth0_id)
      .then((user) => {
        res.json(user ? user : null)
      })
      .catch((err) => res.status(500).send(err.message))
  }
})

// TODO: use checkJwt as middleware
// POST /api/v1/users
router.post('/', (req, res) => {
  const auth0_id = req.user?.sub
  const { username, icon } = req.body
  const userDetails = {
    auth0_id,
    username,
    icon,
  }

  db.userExists(username)
    .then((usernameTaken) => {
      if (usernameTaken) throw new Error('Username Taken')
    })
    .then(() => db.createUser(userDetails))
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error(err)
      if (err.message === 'Username Taken') {
        res.status(403).send('Username Taken')
      } else {
        res.status(500).send(err.message)
      }
    })
})

module.exports = router
