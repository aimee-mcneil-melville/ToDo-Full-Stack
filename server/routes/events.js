const express = require('express')

const db = require('../db/event')

const router = express.Router()

router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  db.getEventById(id)
    .then(event => {
      res.json(event)
      return null
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

router.post('/', (req, res) => {
  const { title, date, volunteersNeeded, description, gardenId } = req.body
  const newEvent = { title, date, volunteersNeeded, description, gardenId }
  db.addEvent(newEvent)
    .then((event) => {
      res.status(201).json(event)
      return null
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

router.patch('/:id/edit', (req, res) => {
  const { title, date, volunteersNeeded, description, id } = req.body
  const updatedEvent = { title, date, volunteersNeeded, description, id }
  db.updateEvent(updatedEvent)
    .then((event) => {
      res.status(201).json(event)
      return null
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

module.exports = router
