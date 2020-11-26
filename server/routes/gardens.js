const express = require('express')

const db = require('../db/gardens')

const router = express.Router()

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getUserGarden(id)
    .then(singleGarden => {
      return res.json(singleGarden)
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

router.get('/', (req, res) => {
  db.getGardens()
    .then(gardens => {
      return res.json({ gardens })
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

router.get('/api/v1/events', (req, res) => {
  db.getEvents()
    .then(events => {
      res.json(events)
      return null
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

router.post('/events/new', (req, res) => {
  const { title, dateTime, volunteersNeeded, description } = req.body
  const newEvent = { title, dateTime, volunteersNeeded, description }
  db.addEvent(newEvent)
    .then((events) => {
      res.json(events)
      return null
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

module.exports = router
