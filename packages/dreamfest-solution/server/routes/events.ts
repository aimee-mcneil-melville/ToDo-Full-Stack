import express from 'express'

import { eventDays, capitalise, validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()
export default router

// GET /events/add/friday
router.get('/add/:day', async (req, res, next) => {
  try {
    const day = validateDay(req.params.day)
    const days = eventDays.map((eventDay) => ({
      value: eventDay,
      name: capitalise(eventDay),
      selected: eventDay === day ? 'selected' : '',
    }))

    // TODO: Replace this with all of the locations in the database
    const locations = await db.getAllLocations()

    const viewData = { locations, days, day }
    res.render('addEvent', viewData)
  } catch (e) {
    next(e)
  }
})

// POST /events/add
router.post('/add', async (req, res, next) => {
  // ASSISTANCE: So you know what's being posted ;)
  try {
    const { name, description, time, locationId } = req.body
    const day = validateDay(req.body.day)

    await db.createEvent({
      day,
      name,
      description,
      time,
      locationId,
    })

    res.redirect(`/schedule/${day}`)
  } catch (e) {
    next(e)
  }
})

// POST /events/delete
router.post('/delete', async (req, res, next) => {
  try {
    const id = Number(req.body.id)
    const day = validateDay(req.body.day)

    // TODO: Delete the event from the database using its id
    await db.deleteEvent(id)

    res.redirect(`/schedule/${day}`)
  } catch (e) {
    next(e)
  }
})

// GET /events/3/edit
router.get('/:id/edit', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const event = await db.getEventById(id)
    const locations_ = await db.getAllLocations()

    const locations = locations_.map((data) => ({
      ...data,
      selected: data.id === event.locationId ? 'selected' : '',
    }))

    // This is done for you with an array of days imported from the helpers file
    const days = eventDays.map((eventDay) => ({
      value: eventDay,
      name: capitalise(eventDay),
      selected: eventDay === event.day ? 'selected' : '',
    }))

    const viewData = { event, locations, days }
    res.render('editEvent', viewData)
  } catch (e) {
    next(e)
  }
})

// POST /events/edit
router.post('/edit', async (req, res, next) => {
  try {
    // ASSISTANCE: So you know what's being posted ;)
    const { name, description, time } = req.body
    const id = Number(req.body.id)
    const day = validateDay(req.body.day)
    const locationId = Number(req.body.locationId)

    // TODO: Update the event in the database using the identifiers created above
    await db.updateEvent(id, { day, locationId, name, description, time })

    res.redirect(`/schedule/${day}`)
  } catch (e) {
    next(e)
  }
})
