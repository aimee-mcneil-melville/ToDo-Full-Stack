const express = require('express')

const { validateDay, getEventIconPath } = require('../helpers')

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
        name: 'Slushie Apocalypse I',
        description: 'This is totally a description of this really awesome event that will be taking place during this festival at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
        icon: getEventIconPath(1),
        location: {
          id: 1,
          name: 'TangleStage',
          description: 'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.'
        }
      },
      {
        id: 2,
        day: 'friday',
        time: '6pm - 7pm',
        name: 'Slushie Apocalypse II',
        description: 'This is totally a description of this really awesome event that will be taking place during this festival at the Yella Yurt. Be sure to not miss the free slushies cause they are rad!',
        icon: getEventIconPath(2),
        location: {
          id: 2,
          name: 'Yella Yurt',
          description: "It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here!"
        }
      }
    ]
  }

  res.render('showDay', viewData)
})
