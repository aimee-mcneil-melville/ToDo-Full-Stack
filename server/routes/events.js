const notificationFile = require('../notificationFunction')

const express = require('express')

const log = require('../logger')
const db = require('../db/event')
const dbUser = require('../db/users')

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

function testEvent (event) {
  const newEvent = event
  const gardenId = event.gardenId
  dbUser.getUserEmailsByGarden(gardenId)
    .then(result => mapOverUsers(result, newEvent))
    .catch(result => console.log(result))
}

function mapOverUsers (userData, eventData) {
  const details = eventData
  console.log(userData)
  userData.map(result => notificationFile.sendNotification(result, details))
}

router.post('/', (req, res) => {
  const { title, date, volunteersNeeded, description, gardenId } = req.body
  const newEvent = { title, date, volunteersNeeded, description, gardenId }
  db.addEvent(newEvent)
    .then((event) => {
      testEvent(event)
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

// notificationFile.sendNotification()
