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

// POST /api/v1/friends/:id
router.post('/:user_id', (req, res) => {
  const userId = req.params.user_id
  const followingId = req.body.following_id
  console.log(userId)
  db.addFriend({ userId, followingId }) // data sending to the db function
    .then((newFriend) => { // db has responded with
      res.json(newFriend)
      return null
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err.message)
    })
})

// DELETE /api/v1/friends/:id
router.delete('/:id', (req, res) => {
  const id = req.params.id
  db.deleteFriend(id)
    .then(() => {
      return res.json('deleted')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err.message)
    })
})

module.exports = router
