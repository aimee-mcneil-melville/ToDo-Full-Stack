const express = require('express')
const log = require('../logger')
const db = require('../db/users')
// const getUserRoles = require('../auth')

const router = express.Router()

module.exports = router

router.post('/', (req, res) => {
  const { firstName, lastName, gardenId, username, auth0Id, email } = req.body

  // const data = {
  //   firstName: 'Dylan',
  //   lastName: 'T',
  //   gardenId: '2',
  //   username: 'El',
  //   email: 'eleaasdor.woodhouse@gmail.com',
  //   auth0Id: 'auth0|60e78a925basd3c78006a2be3e4'
  // }

  const user = {
    firstName,
    lastName,
    gardenId,
    username,
    email,
    auth0Id
  }

  //   Promise.all([db.getUsersByAuth0({ firstName, lastName, gardenId, username, auth0Id })])
  db.createUser(user)
    .then(() => {
      res.json(user)
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
