const express = require('express')

const log = require('../logger')
const db = require('../db/event')
const { sendEventNotifications } = require('../notifications/notificationHelper')
const { get } = require('superagent')
const { useImperativeHandle } = require('react')

const router = express.Router()

module.exports = router

router.post('/', (req, res) => {
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
          title: 'Unable to add event'
        }
      })
    })
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

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getEventById(id)
    .then((event) => {
      // GUEST (Done)
      // const { id, gardenId, gardenName, gardenAddress, volunteersNeeded, title, date, description } = event
      // const guestObject = { id, gardenId, gardenName, gardenAddress, volunteersNeeded, title, date, description }
      // res.json(guestObject)
      //
      // MEMBER (Done - but requires out-of-scope data from eventItemHelper.js, hardcoded isVolunteered result for now)
      const { id, gardenId, gardenName, gardenAddress, volunteersNeeded, title, date, description } = event
      const memberObject = { id, gardenId, gardenName, gardenAddress, volunteersNeeded, title, date, description, isVolunteered: true }
      res.json(memberObject)
      //
      // ADMIN (DONE)
      // res.json(event)
      // }
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
