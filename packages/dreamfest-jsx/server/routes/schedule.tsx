import express from 'express'
import { renderToStaticMarkup } from 'react-dom/server'

import Layout from '../components/Layout.tsx'
import ShowDay from '../components/ShowDay.tsx'
import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()

// GET /schedule/friday
router.get('/:day', (req, res) => {
  const day = validateDay(req.params.day)

  // TODO: Replace the hard-coded `events` array with a set of events from the
  // database. Do this by selecting events that have a "day" field matching the `day` route parameter.
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

  res.send(
    renderToStaticMarkup(
      <Layout>
        <ShowDay day={day} events={events} />
      </Layout>
    )
  )
})

export default router
