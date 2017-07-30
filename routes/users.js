var express = require('express')
var router = express.Router()

var db = require('../db')

router.get('/', (req, res) => {
  db.getUsers(req.app.get('knex'))
    .then((users) => {
      res.send({ users: users })
    })
    .catch((err) => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
