const express = require('express')

const db = require('./db')

const router = express.Router()
const eventDays = ['friday', 'saturday', 'sunday']

module.exports = router

router.get('/', (req, res) => {
  res.redirect('/schedule/friday')
})

/*
 * Schedule routes
 ********************/

router.get('/schedule/:day', (req, res) => {
  const validDay = validateDay(req.params.day)
  const events = db.getEventsByDay(validDay)
  const day = capitalise(validDay)
  res.render('showDay', { events, day })
})

/*
 * Location routes
 ********************/

router.get('/locations', (req, res) => {
  const locations = db.getAllLocations()
  res.render('showLocations', { locations })
})

router.post('/locations/edit', (req, res) => {
  // Foregoing data validation on req.body for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const { name, description } = req.body
  const id = Number(req.body.id)
  db.updateLocation({ id, name, description })
  res.redirect('/locations')
})

router.get('/locations/:id/edit', (req, res) => {
  // Foregoing data validation on req.params.id for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const id = Number(req.params.id)
  const { name, description } = db.getLocationById(id)
  res.render('editLocation', { id, name, description })
})

/*
 * Event routes
 ********************/

router.get('/events/add/:day', (req, res) => {
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

router.post('/events/add', (req, res) => {
  // Foregoing data validation on req.body for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const { name, description, day, time, locationId } = req.body
  db.addNewEvent({ name, description, day, time, locationId })
  res.redirect(`/schedule/${day}`) // redirect to the day of the added event
})

router.get('/events/:id/edit', (req, res) => {
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

router.post('/events/edit', (req, res) => {
  // Foregoing data validation on req.body for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const { name, description, day, time } = req.body
  const id = Number(req.body.id)
  const locationId = Number(req.body.locationId)
  db.updateEvent({ id, name, description, day, time, locationId })
  res.redirect(`/schedule/${day}`)
})

/*
 * Helper functions
 ********************/

function validateDay (day, days = eventDays) {
  // Use the first day as the default value if the day argument isn't valid
  if (typeof day !== 'string') return days[0]
  if (!days.includes(day)) return days[0]

  return day.toLowerCase()
}

function capitalise (name) {
  return name[0].toUpperCase() + name.substring(1)
}
