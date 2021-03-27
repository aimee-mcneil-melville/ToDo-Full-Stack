const express = require('express')

const db = require('../db')
const { eventDays, capitalise } = require('../helpers')

const router = express.Router()
module.exports = router

// GET /events/add/friday
router.get('/add/:day', (req, res) => {
  // Foregoing data validation on req.params.day for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const day = req.params.day.toLowerCase()
  const days = eventDays.map(eventDay => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === day ? 'selected' : ''
  }))
  const locations = db.getAllLocations()
  res.render('addEvent', { locations, days, day })
})

// POST /events/add
router.post('/add', (req, res) => {
  // Foregoing data validation on req.body for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const { name, description, day, time, locationId } = req.body
  db.addNewEvent({ name, description, day, time, locationId })
  res.redirect(`/schedule/${day}`) // redirect to the day of the added event
})

// GET /events/3/edit
router.get('/:id/edit', (req, res) => {
  // Foregoing data validation on req.params.id for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const id = Number(req.params.id)
  const event = db.getEventById(id)
  const days = eventDays.map(eventDay => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === event.day ? 'selected' : ''
  }))
  const locations = db.getAllLocations().map(loc => ({
    id: loc.id,
    name: loc.name,
    selected: loc.id === event.locationId ? 'selected' : ''
  }))
  res.render('editEvent', { event, days, locations })
})

// POST /events/edit
router.post('/edit', (req, res) => {
  // Foregoing data validation on req.body for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const { name, description, day, time } = req.body
  const id = Number(req.body.id)
  const locationId = Number(req.body.locationId)
  db.updateEvent({ id, name, description, day, time, locationId })
  res.redirect(`/schedule/${day}`)
})
