// const jwtAuthz = require('express-jwt-authz')

const express = require('express')
const log = require('../logger')
const db = require('../db/gardens')
const { userHasAdminRole } = require('./auth')
const { getUserById } = require('../db/users')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  db.getGardens()
    .then((gardens) => {
      return res.json({ gardens })
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to retrieve gardens'
        }
      })
    })
})

router.get('/:id', async (req, res) => {
  const userId = req.headers.userid
  const id = Number(req.params.id)
  try {
    const foundGarden = await db.getGardenById(id)
    // Create a deep copy of the garden
    const garden = JSON.parse(JSON.stringify(foundGarden))
    const user = await getUserById(userId)
    const isAdmin = await userHasAdminRole(user.auth0Id)
    if (!isAdmin) {
      garden.events.forEach(event => {
        event.totalVolunteers = event.volunteers.length
        event.isVolunteer = event.volunteers.some((v) => v.userId === userId)
        delete event.volunteers
      })
    } else {
      garden.events.forEach(event => {
        event.totalVolunteers = event.volunteers.length
        event.isVolunteer = event.volunteers.some((v) => v.userId === userId)
      })
    }
    return res.json(garden)
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to retrieve garden'
      }
    })
  }
})
