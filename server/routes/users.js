const express = require('express')
const { getTokenDecoder } = require('authenticare/server')
const db = require('../db')

const router = express.Router()

router.post('/register', getTokenDecoder(), (req, res) => {
  const newUser = req.body.userName
  const password = req.body.password
  const myGarden = req.body.myGarden
  db.createUser(newUser, password, myGarden)
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(500).send('Error', err.message)
    })
})

module.exports = router
