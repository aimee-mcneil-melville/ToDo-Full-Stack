const express = require('express')
const log = require('../logger')
const db = require('../db/gardens')
const dbUsers = require('../db/users')
const { getTokenDecoder } = require('../auth')

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

router.get('/:id', getTokenDecoder(false), (req, res) => {
  const id = Number(req.params.id)
  const user = req.user || {}
  db.getGardenById(id)
    .then((garden) => {
      garden.events.forEach(event => {
        if (!user.isAdmin) {
          event.isVolunteer = event.volunteers.some((v) => v.username === user.username)
          delete event.volunteers
        }
      })
      return res.json(garden)
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to retrieve garden'
        }
      })
    })
})
