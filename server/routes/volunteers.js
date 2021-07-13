const express = require('express')

const log = require('../logger')
const db = require('../db/volunteers')
const { decode } = require('../notifications/emailTokens')
const { getTokenDecoder } = require('../auth')
const { verifyUser } = require('./verificationMiddleware')

const router = express.Router()

module.exports = router

router.get('/emailsignup', (req, res) => {
  const { token } = req.query
  const volunteer = decode(token)

  db.addVolunteer(volunteer)
    .then(() => {
      res.redirect(`/gardens/${volunteer.gardenId}`)
      return null
    })
    .catch(err => {
      log(err.message)
      res.redirect(`./email-volunteer-error/${volunteer.userId}/${volunteer.eventId}`)
      res.status(500).json({
        error: {
          title: 'Unable to register from email'
        }
      })
    })
})

router.post('/', getTokenDecoder(), verifyUser, (req, res) => {
  const { userId, eventId } = req.body

  db.addVolunteer({ userId, eventId })
    .then(() => {
      res.sendStatus(201)
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to register volunteer status'
        }
      })
    })
})

router.delete('/', getTokenDecoder(), verifyUser, (req, res) => {
  const { userId, eventId } = req.body
  db.deleteVolunteer({ userId, eventId })
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

router.patch('/', getTokenDecoder(), (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401).json({
      error: {
        title: 'Unauthorized'
      }
    })
    return
  }

  const { hasAttended, userId, eventId } = req.body

  db.setVolunteerAttendance({ hasAttended, userId, eventId })
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

router.post('/extras', getTokenDecoder(), (req, res) => {
  const { eventId, firstName, lastName } = req.body

  db.addExtraVolunteer({ eventId, firstName, lastName })
    .then(() => {
      res.sendStatus(201)
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
