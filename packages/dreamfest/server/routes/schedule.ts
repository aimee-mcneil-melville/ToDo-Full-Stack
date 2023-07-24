import express from 'express'

import { validateDay } from './helpers'
import * as db from '../db'

const router = express.Router()

// GET /schedule/friday
router.get('/:day', (req, res) => {
  const day = validateDay(req.params.day)

  // TODO: Replace the hard-coded `events` array in the viewData with a set of events from the
  // database. Do this by selecting events that have a "day" field matching the `day` route parameter.
  // Continue to supply the `day` as a property of the viewData, alongside the array of events.
  const viewData = {
    day: day,
    events: [
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
    ],
  }

  res.render('showDay', viewData)
})

export default router
