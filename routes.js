const express = require('express')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/schedule/:date', (req, res) => {
  const { date } = req.params
  res.render('showDate', { date })
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
  res.render('showEvent', { id })
})

router.post('/events', (req, res) => {
  const { id } = req.body
  console.log('POSTed to /events with ID ' + id)
  res.redirect(`/events/${id}`)
})
