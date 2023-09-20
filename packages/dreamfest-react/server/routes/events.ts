import express from 'express'

import { eventDays, capitalise, validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()
export default router

// GET /events/add/friday
router.get('/add/:day', (req, res) => {
  const day = validateDay(req.params.day)
  const days = eventDays.map((eventDay) => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === day ? 'selected' : '',
  }))

  // TODO: Replace this with all of the locations in the database
  const locations = [
    {
      id: 1,
      name: 'TangleStage',
    },
    {
      id: 2,
      name: 'Yella Yurt',
    },
  ]

  const viewData = { locations, days, day }
  res.render('addEvent', viewData)
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
router.get('/:id', async (req, res, next) => {
  try {
  const id = Number(req.params.id)
  const event = await db.getEventById(id)
  res.json(event)
  } catch (e) {
    next(e)
  } 
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
