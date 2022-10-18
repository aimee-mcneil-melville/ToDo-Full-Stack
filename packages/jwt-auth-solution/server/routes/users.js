const express = require('express')
const checkJwt = require('../auth0')

const db = require('../db/users')
const router = express.Router()

// GET /api/v1/users
router.get('/', checkJwt, (req, res) => {
  const auth0_id = req.auth?.sub

  if (!auth0_id) {
    res.send(null)
  } else {
    db.getUser(auth0_id)
      .then((user) => {
        res.json(user ? user : null)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send(err.message)
      })
  }
})

// POST /api/v1/users
router.post('/', checkJwt, (req, res) => {
  const auth0_id = req.auth?.sub
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
