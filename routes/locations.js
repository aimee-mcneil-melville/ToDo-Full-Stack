const express = require('express')

const db = require('../db')

const router = express.Router()
module.exports = router

// GET /locations
router.get('/', (req, res) => {
  db.getAllLocations()
    .then((locations) => {
      const viewData = { locations }
      res.render('showLocations', viewData)
    })
    .catch((err) => {
      console.log(err)
    })
})

// POST /locations/edit
router.post('/edit', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // const { id, name, description } = req.body

  // TODO: Update the location in the database based on its id

  res.redirect('/locations')
})

// GET /locations/4/edit
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)

  // TODO: Get the location based on its id and replace this viewData
  const viewData = {
    id: id,
    name: 'TangleStage',
    description:
      'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.',
  }

  res.render('editLocation', viewData)
})
