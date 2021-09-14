const express = require('express')

const db = require('../db/friends')

const router = express.Router()

router.get('/:id', (req, res) => {
  db.getFriends(req.params.id)
    .then(results => {
      res.json({ friends: results })
      return null
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

module.exports = router
