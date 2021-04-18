const express = require('express')

const db = require('../db/friends')

const router = express.Router()

router.get('/', (req, res) => {
  db.getFriends()
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
