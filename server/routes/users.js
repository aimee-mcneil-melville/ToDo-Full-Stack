const express = require('express')
const log = require('../logger')
const db = require('../db/users')
const { getIsAdmin, getUserRoles } = require('../auth')

const router = express.Router()

module.exports = router

router.post('/', async (req, res) => {
  const { firstName, lastName, gardenId, username, auth0Id, email } = req.body
  const { authorization } = req.headers

  const user = {
    firstName,
    lastName,
    gardenId,
    username,
    email,
    auth0Id
  }
  //   Promise.all([db.getUsersByAuth0({ firstName, lastName, gardenId, username, auth0Id })])

  try {
    const addedId = await db.createUser(user)
    log('user: ', addedId, 'added')
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'failed: user exists'
      }
    })
  }

  try {
    const addedUser = await db.getUsersByAuth(user.auth0Id)
    res.json({ ...addedUser, isAdmin: await getIsAdmin(user.auth0Id, authorization) })
    return null
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'failed to retrieve added user'
      }
    })
  }
})

router.get('/:id', async (req, res) => {
  // console.log(req)
  const { id } = req.params
  const { authorization } = req.headers
  try {
    const isAdmin = await getUserRoles(id, authorization)
    const user = await db.getUsersByAuth(id)
    // console.log(id, authorization)
    res.json({ ...user, isAdmin: isAdmin })
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
