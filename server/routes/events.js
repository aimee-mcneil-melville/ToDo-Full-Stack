const notification = require('../notificationHelper')
// const {testEvent} from './notification'
const express = require('express')

const log = require('../logger')
const db = require('../db/event')
const { decode } = require('../emailTokens')
const { addVolunteer } = require('../db/volunteers')

const router = express.Router()

module.exports = router

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getEventById(id)
    .then((event) => {
      res.json(event)
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to retrieve event'
        }
      })
    })
})

router.post('/', (req, res) => {
  const { title, date, volunteersNeeded, description, gardenId } = req.body
  const newEvent = { title, date, volunteersNeeded, description, gardenId }
  db.addEvent(newEvent)
    .then((event) => {
      notification.usersByGarden(event)
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
  // console.log('from end of post route ', newEvent)
})

router.patch('/:id', (req, res) => {
  const { title, date, volunteersNeeded, description, id } = req.body
  const updatedEvent = { title, date, volunteersNeeded, description, id }
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

router.get('/emailsignup', (req, res) => {
  const { token } = req.query
  const volunteer = decode(token)

  addVolunteer(volunteer)
    .then(() => {
      res.redirect('/')
      return null
    })
    .catch(e => {
      res.status(500).send()
    })
})

// notificationFile.sendNotification()
