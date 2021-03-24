const express = require('express')

// TODO: Remove these
const events = require('./db/data/events.json')
const locations = require('./db/data/locations.json')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  res.redirect('/schedule/friday')
})

router.get('/schedule/:day', (req, res) => {
  const dayEvents = events.map(event => {
    return {
      ...event,
      icon: getEventIconPath(event.id),
      location: locations.find(loc => loc.id === event.location_id)
    }
  })
  const day = capitalise(req.params.day)
  res.render('showDay', { day, events: dayEvents })
})

router.get('/locations/edit/:id', (req, res) => {
  const { id } = req.params
  res.render('editLocation', { id })
})

router.get('/locations/:id', (req, res) => {
  const { id } = req.params
  res.render('showLocation', { id })
})

router.post('/locations', (req, res) => {
  const { id } = req.body
  console.log('POSTed to /locations with ID ' + id)
  res.redirect(`/locations/${id}`)
})

router.get('/events/edit/:id', (req, res) => {
  const { id } = req.params
  res.render('editEvent', { id })
})

router.get('/events/:id', (req, res) => {
  const { id } = req.params
  const viewData = {
    id,
    name: 'test event',
    icon: getEventIconPath(id),
    description: 'test description',
    location: { id: 1, name: 'test location' }
  }
  res.render('showEvent', viewData)
})

router.post('/events', (req, res) => {
  const { id } = req.body
  console.log('POSTed to /events with ID ' + id)
  res.redirect(`/events/${id}`)
})

function getEventIconPath (id) {
  return `/images/eventIcons/event${(id % 6) + 1}.svg`
}

function capitalise (name) {
  if (typeof name !== 'string') return ''
  return name[0].toUpperCase() + name.substring(1)
}
