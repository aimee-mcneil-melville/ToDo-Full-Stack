const express = require('express')

const db = require('../db')

const router = express.Router()

// router.get('/', (req, res) => {
//   db.getGardens()
//     .then(gardens => {
//       res.json({gardens})
//     })
//     .catch(err => {
//       res.status(500).json({error: err.message})
//     })
// })

router.get('/', (req, res) => {
  db.getChosenGarden()
    .then(gardens => {
      console.log(gardens)
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})

module.exports = router
