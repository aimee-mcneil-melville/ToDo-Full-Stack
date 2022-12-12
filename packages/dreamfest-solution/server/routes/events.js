const express = require('express')

const { eventDays, capitalise, validateDay } = require('./helpers')
const db = require('../db')

const router = express.Router()
module.exports = router

// GET /events/add/friday
router.get('/add/:day', (req, res) => {
  const day = validateDay(req.params.day)
  const days = eventDays.map((eventDay) => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === day ? 'selected' : '',
  }))
  db.getAllLocations()
    .then((locations) => {
      const viewData = { locations, days, day }
      res.render('addEvent', viewData)
    })
    .catch((err) => {
      console.log(err)
    })
})

// POST /events/add
router.post('/add', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  const { name, description, time, locationId } = req.body
  const day = validateDay(req.body.day)

  db.addNewEvent({ name, description, time, location_id: locationId, day })
    .then(() => {
      res.redirect(`/schedule/${day}`)
    })
    .catch((err) => {
      console.log(err)
    })
})

// POST /events/delete
router.post('/delete', (req, res) => {
  const id = Number(req.body.id)
  const day = validateDay(req.body.day)

  db.deleteEvent(id)
    .then(() => {
      res.redirect(`/schedule/${day}`)
    })
    .catch((err) => {
      console.log(err)
    })
})

// GET /events/3/edit
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)

  const viewData = {}

  db.getEventById(id)
    .then((event) => {
      // This is done for you
      const days = eventDays.map((eventDay) => ({
        value: eventDay,
        name: capitalise(eventDay),
        selected: eventDay === event.day ? 'selected' : '',
      }))

      viewData.event = event
      viewData.days = days

      return db.getAllLocations()
    })
    .then((locations) => {
      viewData.locations = locations.map((location) => {
        if (location.id === viewData.event.locationId) {
          return { id: location.id, name: location.name, selected: 'selected' }
        } else {
          return { id: location.id, name: location.name, selected: '' }
        }
      })
      res.render('editEvent', viewData)
    })
    .catch((err) => {
      console.log(err)
    })
})

// POST /events/edit
router.post('/edit', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  const { name, description, time } = req.body
  const id = Number(req.body.id)
  const day = validateDay(req.body.day)
  const locationId = Number(req.body.locationId)

  // TODO: Update the event in the database using the identifiers created above
  db.updateEvent({ id, name, description, time, day, location_id: locationId })
    .then(() => {
      res.redirect(`/schedule/${day}`)
    })
    .catch((err) => {
      console.log(err)
    })
})
