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
      res.redirect('/garden')
      return null
    })
    .catch(e => {
      res.status(500).send()
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

router.put('/', getTokenDecoder(), (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401).json({
      error: {
        title: 'Unauthorized'
      }
    })
    return
  }

  const { isAttended, userId, eventId } = req.body
  db.attend({
    isAttended,
    userId,
    eventId
  }).then(() => {
    res.sendStatus(200)
    return null
  }).catch(err => {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to set is attend to this event'
      }
    })
  })
})

router.post('/extras', (req, res) => {
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
    })} )