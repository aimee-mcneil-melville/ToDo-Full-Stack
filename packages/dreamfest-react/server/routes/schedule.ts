import express from 'express'

import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()

// GET api/v1/schedule/friday
router.get('/:day', async (req, res, next) => {
  try {
    const day = validateDay(req.params.day)
    // TODO: replace this data with the results of calling  db.getEventsForDay
    const events = [
      {
        id: 1,
        day: 'friday',
        time: '2pm - 3pm',
        eventName: 'Slushie Apocalypse I',
        description:
          'This is totally a description of this really awesome event that will be taking place during this festival at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
        locationName: 'TangleStage',
      },
      {
        id: 2,
        day: 'friday',
        time: '6pm - 7pm',
        eventName: 'Slushie Apocalypse II',
        description:
          'This is totally a description of this really awesome event that will be taking place during this festival at the Yella Yurt. Be sure to not miss the free slushies cause they are rad!',
        locationName: 'Yella Yurt',
      },
    ]
    res.json({ day, events })
  } catch (e) {
    next(e)
  }
})

export default router
