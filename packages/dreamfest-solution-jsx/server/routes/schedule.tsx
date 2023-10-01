import express from 'express'
import { renderToStaticMarkup } from 'react-dom/server'

import Layout from '../components/Layout.tsx'
import ShowDay from '../components/ShowDay.tsx'
import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()

// GET /schedule/friday
router.get('/:day', async (req, res) => {
  const day = validateDay(req.params.day)

  // TODO: Replace the hard-coded `events` array with a set of events from the
  // database. Do this by selecting events that have a "day" field matching the `day` route parameter.
  const events = await db.getEventsForDay(day)

  res.send(
    renderToStaticMarkup(
      <Layout>
        <ShowDay day={day} events={events} />
      </Layout>
    )
  )
})

export default router
