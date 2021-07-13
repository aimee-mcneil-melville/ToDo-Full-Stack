const express = require('express')
const log = require('../logger')
const db = require('../db/users')
const { getIsAdmin, getUserRoles } = require('../auth')

const router = express.Router()

module.exports = router

router.post('/', async (req, res) => {
  const { firstName, lastName, gardenId, username, auth0Id } = req.body
  const { authorization } = req.headers

  const data = {
    firstName: 'james 5',
    lastName: 'p',
    gardenId: '2',
    username: 'pl',
    email: 'eleaasdor.woodhouse@gmail.com',
    auth0Id: 'auth0|60e72328a99925basd323c782006a2bed3e4'
  }
  //   Promise.all([db.getUsersByAuth0({ firstName, lastName, gardenId, username, auth0Id })])

  try {
    const addedId = await db.createUser(data)
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
    const addedUser = await db.getUsersByAuth(data.auth0Id)
    res.json({ ...addedUser, isAdmin: await getIsAdmin(data.auth0Id, authorization) })
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
    const user = await db.getUsersByAuth(id)
    console.log(id, authorization)
    res.json({ ...user, isAdmin: await getUserRoles(id, authorization) })
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
