const express = require('express')

const db = require('../db')
const { validateDay, capitalise } = require('../helpers')

const router = express.Router()
module.exports = router

// GET /schedule/friday
router.get('/:day', (req, res) => {
  const validDay = validateDay(req.params.day)
  const events = db.getEventsByDay(validDay)
  const day = capitalise(validDay)
  res.render('showDay', { events, day })
})
