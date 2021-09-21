const express = require('express')

const db = require('../db/user')

const router = express.Router()

// update profile
// PATCH /api/v1/user/user_id/update
router.patch('/:user_id/update', (req, res) => {
  db.updateUser(req.body)
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch(err => {
      console.err(err)
      res.status(500).send(err.message)
    })
})

module.exports = router
