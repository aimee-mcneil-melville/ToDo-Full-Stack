const express = require('express')
const { getTokenDecoder } = require('authenticare/server')

const log = require('../logger')
const db = require('../db/gardens')
const dbUsers = require('../db/users')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  db.getGardens()
    .then((gardens) => {
      return res.json({ gardens })
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to retrieve gardens'
        }
      })
    })
})

router.get('/:id', getTokenDecoder(), async (req, res) => {
  const id = Number(req.params.id)
  const userName = req.user.username
  dbUsers.getUserByName(userName)
    .then((user) => {
      db.getGardenById(id)
        .then((singleGarden) => {
          singleGarden.events.map(event => {
            if (user.is_admin === false) {
              event.isVolunteer = event.volunteers.some((v) => v.username === userName)
              delete event.volunteers
            }
          })
          return res.json(singleGarden)
        })
        .catch((err) => {
          log(err.message)
          res.status(500).json({
            error: {
              title: 'Unable to retrieve garden'
            }
          })
        })
    })
})
