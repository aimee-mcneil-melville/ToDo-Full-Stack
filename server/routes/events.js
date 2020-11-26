const express = require('express')

// const db = require('../db/events')

const router = express.Router()

router.get('/', (req, res) => {
  res.json('get route ')
  // db.getEvents()
  //   .then(events => {
  //     res.json(events)
  //     return null
  //   })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

router.post('/', (req, res) => {
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
