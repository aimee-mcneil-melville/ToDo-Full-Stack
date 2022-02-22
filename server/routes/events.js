const { checkJwt } = require('./auth')
const jwtAuthz = require('express-jwt-authz')

const express = require('express')
const log = require('../logger')
const db = require('../db/event')

const router = express.Router()

module.exports = router
const checkAdmin = jwtAuthz(['create:event', 'update:event'], {
  customScopeKey: 'permissions'
})

router.post('/', checkJwt, checkAdmin, (req, res) => {
  const { title, date, volunteersNeeded, description, gardenId } = req.body
  const event = { title, date, volunteersNeeded, description, gardenId }
  db.addEvent(event)
    .then((event) => {
      res.status(201).json(event)
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to add event'
        }
      })
    })
})

router.patch('/:id', checkJwt, checkAdmin, (req, res) => {
  const { title, date, volunteersNeeded, description, id, status } = req.body
  const updatedEvent = { title, date, volunteersNeeded, description, id, status }
  db.updateEvent(updatedEvent)
    .then((event) => {
      res.status(200).json(event)
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to update event'
        }
      })
    })
})

router.patch('/:id/cancel', checkJwt, checkAdmin, (req, res) => {
  const { id } = req.body
  db.cancelEvent(id)
    .then((event) => {
      res.status(200).json(event)
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to cancel event'
        }
      })
    })
})

router.get('/:id', async (req, res) => {
  const eventId = Number(req.params.id)
  try {
    const event = await db.getEventById(eventId)
    const { gardenId, gardenName, gardenAddress, volunteersNeeded, title, date, description, volunteers, extraVolunteers, lat, lon, status } = event
    const eventResponse = { gardenId, gardenName, gardenAddress, volunteersNeeded, title, date, description, lat, lon, volunteers, extraVolunteers, status }

    res.json(eventResponse)
    return null
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to retrieve event'
      }
    })
  }
})
