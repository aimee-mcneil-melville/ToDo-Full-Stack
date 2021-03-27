const express = require('express')

const db = require('../db')

const router = express.Router()
module.exports = router

// GET /locations
router.get('/', (req, res) => {
  db.getAllLocations()
    .then(locations => {
      res.render('showLocations', { locations })
      return null
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Unable to retrieve locations')
    })
})

// POST /locations/edit
router.post('/edit', (req, res) => {
  // Foregoing data validation on req.body for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const { name, description } = req.body
  const id = Number(req.body.id)
  db.updateLocation({ id, name, description })
  res.redirect('/locations')
})

// GET /locations/4/edit
router.get('/:id/edit', (req, res) => {
  // Foregoing data validation on req.params.id for the sake of brevity,
  // but for security reasons do NOT do this in a real production application
  const id = Number(req.params.id)
  const { name, description } = db.getLocationById(id)
  res.render('editLocation', { id, name, description })
})
