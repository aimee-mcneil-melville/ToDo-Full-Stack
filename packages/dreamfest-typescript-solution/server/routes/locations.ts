import express from 'express'

import * as db from '../db'

const router = express.Router()

// GET /locations
router.get('/', async (req, res, next) => {
  try {
    const locations = await db.getAllLocations()
    const viewData = { locations }
    res.render('showLocations', viewData)
  } catch (e) {
    next(e)
  }
})

// GET /locations/4/edit
router.get('/:id/edit', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const viewData = await db.getLocationById(id)

    res.render('editLocation', viewData)
  } catch (e) {
    next(e)
  }
})

// POST /locations/edit
router.post('/edit', async (req, res, next) => {
  try {
    const { id, ...data } = req.body
    await db.updateLocation(id, data)
    res.redirect('/locations')
  } catch (e) {
    next(e)
  }
})

export default router
