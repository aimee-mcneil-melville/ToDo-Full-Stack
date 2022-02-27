const { checkJwt } = require('./auth') // scope permissions
const jwtAuthz = require('express-jwt-authz')

const express = require('express')
const log = require('../logger')
const db = require('../db/event')

const {
  sendEventNotifications,
} = require('../notifications/notificationHelper')

const router = express.Router()

module.exports = router
const checkAdmin = jwtAuthz(['create:event', 'update:event'], {
  customScopeKey: 'permissions',
})

router.post('/', checkJwt, checkAdmin, (req, res) => {
  const { title, date, volunteersNeeded, description, gardenId } = req.body
  const event = { title, date, volunteersNeeded, description, gardenId }
  let createdEvent = null
  db.addEvent(event)
    .then((event) => {
      createdEvent = event
      return sendEventNotifications(event)
    })
    .then(() => {
      res.status(201).json(createdEvent)
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to add event',
        },
      })
    })
})

// include getTokenDecoder() like function into post route that passes authorisation header?REQUIRES TOKEN + ADMIN

router.patch('/:id', checkJwt, checkAdmin, (req, res) => {
  const { title, date, volunteersNeeded, description, id, status } = req.body
  const updatedEvent = {
    title,
    date,
    volunteersNeeded,
    description,
    id,
    status,
  }
  db.updateEvent(updatedEvent)
    .then((event) => {
      res.status(200).json(event)
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to update event',
        },
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
          title: 'Unable to cancel event',
        },
      })
    })
})

// GET /api/v1/events/1
router.get('/:id', async (req, res) => {
  const eventId = Number(req.params.id)
  try {
    const event = await db.getEventById(eventId)
    const {
      gardenId,
      gardenName,
      gardenAddress,
      volunteersNeeded,
      title,
      date,
      description,
      volunteers,
      extraVolunteers,
      lat,
      lon,
      status,
    } = event
    const eventResponse = {
      gardenId,
      gardenName,
      gardenAddress,
      volunteersNeeded,
      title,
      date,
      description,
      lat,
      lon,
      volunteers,
      extraVolunteers,
      status,
    }

    res.json(eventResponse)
    return null
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to retrieve event',
      },
    })
  }
})
