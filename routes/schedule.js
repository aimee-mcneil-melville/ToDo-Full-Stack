const express = require('express')

const { validateDay } = require('../helpers')
const db = require('../db')

const router = express.Router()
module.exports = router

// GET /schedule/friday
router.get('/:day', (req, res) => {
  const day = validateDay(req.params.day)

  // TODO: Replace this hard-coded viewData with data from the database
  // The events property below should only be the events where its day matches validDay
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
