const express = require('express')

const { eventDays, capitalise } = require('../helpers')

const router = express.Router()
module.exports = router

// GET /events/add/friday
router.get('/add/:day', (req, res) => {
  const day = req.params.day.toLowerCase()
  const days = eventDays.map(eventDay => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === day ? 'selected' : ''
  }))

  // TODO: Replace this with all of the locations in the database
  const locations = [
    {
      id: 1,
      name: 'TangleStage',
      description: 'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.'
    },
    {
      id: 2,
      name: 'Yella Yurt',
      description: "It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here!"
    }
  ]

  const viewData = { locations, days, day }
  res.render('addEvent', viewData)
})

// POST /events/add
router.post('/add', (req, res) => {
  // Skipping data validation on req.body for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const { name, description, day, time, locationId } = req.body

  // TODO:
  db.addNewEvent({ name, description, day, time, locationId })
  res.redirect(`/schedule/${day}`) // redirect to the day of the added event
})

// GET /events/3/edit
router.get('/:id/edit', (req, res) => {
  // Skipping data validation on req.params.id for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const id = Number(req.params.id)
  const event = db.getEventById(id)
  const days = eventDays.map(eventDay => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === event.day ? 'selected' : ''
  }))
  db.getAllLocations()
    .then(locs => {
      const locations = locs.map(loc => ({
        id: loc.id,
        name: loc.name,
        selected: loc.id === event.locationId ? 'selected' : ''
      }))
      res.render('editEvent', { event, days, locations })
      return null
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Unable to retrieve locations')
    })
})

// POST /events/edit
router.post('/edit', (req, res) => {
  // Skipping data validation on req.body for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const { name, description, day, time } = req.body
  const id = Number(req.body.id)
  const locationId = Number(req.body.locationId)
  db.updateEvent({ id, name, description, day, time, locationId })
  res.redirect(`/schedule/${day}`)
})

// POST /events/delete
router.post('/delete', (req, res) => {
  // Skipping data validation on req.body for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const id = Number(req.body.id)
  db.deleteEvent(id)
  res.redirect(`/schedule/${req.body.day}`)
})
