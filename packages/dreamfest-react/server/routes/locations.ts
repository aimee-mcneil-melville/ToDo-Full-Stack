import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /locations
router.get('/', async (req, res, next) => {
  try {
    const locations = await db.getAllLocations()
    res.json({ locations })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const location = await db.getLocationById(Number(id))
    res.json(location)
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { name, description } = req.body
    await db.updateLocation(id, { name, description })
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

export default router
