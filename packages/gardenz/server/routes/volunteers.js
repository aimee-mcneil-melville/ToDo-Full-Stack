const { sendNotification } = require('../notifications/notifications')
const { checkJwt } = require('./auth') // scope permissions
const jwtAuthz = require('express-jwt-authz')

const express = require('express')

const log = require('../logger')
const dbUsers = require('../db/users')
const dbEvents = require('../db/event')
const dbVolunteers = require('../db/volunteers')

const { decode } = require('../notifications/emailTokens')

const router = express.Router()

const checkAdmin = jwtAuthz(['update:event_volunteers'], {
  customScopeKey: 'permissions'
})

module.exports = router

router.get('/emailsignup', (req, res) => {
  const { token } = req.query
  const volunteer = decode(token)

  dbVolunteers.addVolunteer(volunteer)
    .then(() => {
      res.redirect(`/gardens/${volunteer.gardenId}`)
      return null
    })
    .catch(err => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to register from email'
        }
      })
    })
})

// Verifies the data being modified belongs to the user that added it. --------------------
router.post('/', checkJwt, async (req, res) => {
  const { userId, eventId } = req.body
  const volunteer = { userId, eventId }
  try {
    await dbVolunteers.addVolunteer({ volunteer })
    const eventData = await dbEvents.getEventById(eventId)
    const userData = await dbUsers.getUserById(userId)
    await sendNotification(userData, eventData)
    res.sendStatus(201)
  } catch (error) {
    log(error.message)
    res.status(500).json({
      error: {
        title: 'Unable to register volunteer status'
      }
    })
  }
})

// Verifies the data being modified belongs to the user that added it.
router.delete('/', checkJwt, (req, res) => {
  const { userId, eventId } = req.body
  dbVolunteers.deleteVolunteer({ userId, eventId })
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to remove volunteer status'
        }
      })
    })
})

router.patch('/', checkJwt, checkAdmin, (req, res) => {
  const { hasAttended, userId, eventId } = req.body

  dbVolunteers.setVolunteerAttendance({ hasAttended, userId, eventId })
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch(err => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to set attendance for this volunteer/event'
        }
      })
    })
})

router.post('/extras', checkJwt, (req, res) => {
  const { eventId, firstName, lastName } = req.body

  dbVolunteers.addExtraVolunteer({ eventId, firstName, lastName })
    .then((result) => {
      res.status(201).json({ extraVolId: result[0] })
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to add extra volunteer'
        }
      })
    })
})
