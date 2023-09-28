import { renderToStaticMarkup } from 'react-dom/server'
import express from 'express'

import { eventDays, capitalise, validateDay } from './helpers.ts'
import Layout from '../components/Layout.tsx'
import AddEvent from '../components/AddEvent.tsx'
import * as db from '../db/index.ts'
import EditEvent from '../components/EditEvent.tsx'
import { Location } from '../../models/Location.ts'
import { Event } from '../../models/Event.ts'

const router = express.Router()
export default router

// GET /events/add/friday
router.get('/add/:day', (req, res) => {
  const day = validateDay(req.params.day)
  const days = eventDays.map((eventDay) => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === day,
  }))

  // TODO: Replace this with all of the locations in the database
  const locations = [
    {
      id: 1,
      name: 'TangleStage',
      description: 'Not the biggest stage, but perhaps the most hip.',
    },
    {
      id: 2,
      name: 'Yella Yurt',
      description: "It's a freakin' yurt! Get in here!",
    },
  ]

  res.send(
    renderToStaticMarkup(
      <Layout>
        <AddEvent locations={locations} days={days} selectedDayName={day} />
      </Layout>
    )
  )
})

// POST /events/add
router.post('/add', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // const { name, description, time, locationId } = req.body
  // const day = validateDay(req.body.day)

  // TODO: Add the event to the database and then redirect

  const day = 'friday' // TODO: Remove this line

  res.redirect(`/schedule/${day}`)
})

// POST /events/delete
router.post('/delete', (req, res) => {
  // const id = Number(req.body.id)
  // const day = validateDay(req.body.day)

  // TODO: Delete the event from the database using its id

  const day = 'friday' // TODO: Remove this line

  res.redirect(`/schedule/${day}`)
})

// GET /events/3/edit
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)

  // TODO: Replace event below with the event from the database using its id
  // NOTE: It should have the same shape as this one
  const event: Event = {
    id: id,
    locationId: 1,
    day: 'friday',
    time: '2pm - 3pm',
    name: 'Slushie Apocalypse I',
    description:
      'This is totally a description of this really awesome event that will be taking place during this festival at the Yella Yurt. Be sure to not miss the free slushies cause they are rad!',
  }

  // TODO: Replace locations below with all of the locations from the database
  // NOTE: The objects should have the same shape as these.
  const locations: Location[] = [
    { id: 1, name: 'TangleStage', description: '' },
    { id: 2, name: 'Yella Yurt', description: '' },
    { id: 3, name: 'Puffy Paddock', description: '' },
    { id: 4, name: 'Kombucha Karavan', description: '' },
  ]

  // This is done for you with an array of days imported from the helpers file
  const days = eventDays.map((eventDay) => ({
    value: eventDay,
    name: capitalise(eventDay),
  }))

  res.send(
    renderToStaticMarkup(
      <Layout>
        <EditEvent
          event={event}
          locations={locations}
          days={days}
          selectedDayName={event.day}
          selectedLocationId={event.locationId}
        />
      </Layout>
    )
  )
})

// POST /events/edit
router.post('/edit', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // const { name, description, time } = req.body
  // const id = Number(req.body.id)
  // const day = validateDay(req.body.day)
  // const locationId = Number(req.body.locationId)

  // TODO: Update the event in the database using the identifiers created above

  const day = 'friday' // TODO: Remove this line

  res.redirect(`/schedule/${day}`)
})
