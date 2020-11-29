const express = require('express')

const db = require('../db/event')

const router = express.Router()

router.get('/', (req, res) => {
  db.getEvents()
    .then(events => {
      res.json(events)
      return null
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

router.post('/', (req, res) => {
  const { title, date, volunteers, description, gardenId } = req.body
  const newEvent = {
    title,
    date: date,
    volunteersNeeded: volunteers,
    description,
    gardenId
  }
  console.log(newEvent)
  db.addEvent(newEvent)
    .then((event) => {
      res.status(201).json(event)
      return null
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

module.exports = router
