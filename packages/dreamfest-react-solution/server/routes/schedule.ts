import express from 'express'

import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()

// GET api/v1/schedule/friday
router.get('/:day', async (req, res, next) => {
  try {
    const day = validateDay(req.params.day)
    const events = await db.getEventsForDay(day)
    res.json({ day, events })
  } catch (e) {
    next(e)
  }
})

export default router
