const express = require('express')

const db = require('../db/media')

const router = express.Router()

router.get('/getMedia/:id', (req, res) => {
  db.getMedia(req.params.id)
    .then(results => {
      res.json(results)
      return null
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

module.exports = router