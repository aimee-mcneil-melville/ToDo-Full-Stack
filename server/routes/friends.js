const express = require('express')

const db = require('../db/friends')

const router = express.Router()

// GET /api/v1/friends/10001
// Friends List
router.get('/:user_id', (req, res) => {
  db.getFriends(req.params.user_id)
    .then(results => {
      res.json({ friends: results })
      return null
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

// add new friends
// POST /api/v1/friends/:id
// follower id from req.body
//      redirect to: Friends List

// delete friend
// DELTE /api/v1/friends/:id
//      redirect to: Friends list

module.exports = router
