const express = require('express')
const log = require('../logger')
const db = require('../db/users')
const { userHasAdminRole } = require('./auth')

const router = express.Router()

module.exports = router

router.post('/', async (req, res) => {
  const { firstName, lastName, gardenId, username, auth0Id, email } = req.body // TODO: Delete username

  const user = {
    firstName,
    lastName,
    gardenId,
    username, // TODO: Delete username
    email,
    auth0Id
  }

  try {
    await db.createUser(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      error: {
        title: 'failed: user exists'
      }
    })
  }

  try {
    const addedUser = await db.getUsersByAuth(user.auth0Id)
    res.json(addedUser)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      error: {
        title: 'failed to retrieve added user'
      }
    })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const isAdmin = await userHasAdminRole(id)
    const user = await db.getUsersByAuth(id)
    res.json({ ...user, isAdmin })
    return null
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'failed to retrieve user'
      }
    })
  }
})
