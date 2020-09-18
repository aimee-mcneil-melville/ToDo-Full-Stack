const express = require('express')

const db = require('../db')

const router = express.Router()

router.get('/garden/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getGarden(id)
    .then(singleGarden => {
      res.json({ singleGarden })
    })
    .catch(err => {
      console.error(err)
      test.status(500).send('Error id problems')
    })
})

module.exports = router
