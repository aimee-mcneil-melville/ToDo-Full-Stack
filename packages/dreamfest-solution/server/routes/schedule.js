const express = require('express')

const { validateDay } = require('./helpers')
const db = require('../db')

const router = express.Router()
module.exports = router

// GET /schedule/friday
router.get('/:day', (req, res) => {
  const day = validateDay(req.params.day)
  db.getEventsByDay(day)
    .then((events) => {
      const viewData = {
        day: day,
        events: events,
      }
      res.render('showDay', viewData)
    })
    .catch((err) => {
      console.log(err)
    })
})
