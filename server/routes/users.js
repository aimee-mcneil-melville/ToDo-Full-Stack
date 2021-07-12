const express = require('express')
const log = require('../logger')
const db = require('../db/users')
const getUserRoles = require('../auth')

const router = express.Router()

module.exports = router

router.post('/', (req, res) => {
  const { firstName, lastName, gardenId, username, auth0Id } = req.body

  const data = {
    firstName: 'Dylan',
    lastName: 'T',
    gardenId: '2',
    username: 'El',
    email: 'eleaasdor.woodhouse@gmail.com',
    auth0Id: 'auth0|60e78a925basd3c78006a2be3e4'
  }
  //   Promise.all([db.getUsersByAuth0({ firstName, lastName, gardenId, username, auth0Id })])
  db.createUser(data)
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch(err => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'User Exists'
        }
      })
    })
})
