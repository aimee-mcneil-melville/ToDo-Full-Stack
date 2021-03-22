const express = require('express')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  const locations = [ // TODO: get this from the database instead
    { id: 1, name: 'test location' }
  ]
  res.render('home', { locations })
})

router.get('/schedule/:date', (req, res) => {
  const { date } = req.params
  const events = [ // TODO: get this from the database instead
    { id: 1, name: 'test event' }
  ]
  res.render('showDate', { date, events })
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
