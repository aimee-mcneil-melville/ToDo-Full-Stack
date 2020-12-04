const express = require('express')

const db = require('../db/gardens')

const router = express.Router()

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getGardenById(id)
    .then(singleGarden => {
      return res.json(singleGarden)
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

router.get('/', (req, res) => {
  db.getGardens()
    .then(gardens => {
      return res.json({ gardens })
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

module.exports = router
