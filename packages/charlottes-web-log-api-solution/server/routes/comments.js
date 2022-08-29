const express = require('express')

// eslint-disable-next-line no-unused-vars
const db = require('../db/db')

const router = express.Router()

router.patch('/:commentId', (req, res) => {
  const id = req.params.commentId
  const comment = req.body
  return db.updateComment(id, comment).then((comment) => {
    res.json(comment)
  })
})

router.delete('/:commentId', (req, res) => {
  const id = req.params.commentId
  return db.deleteComment(id).then(() => {
    res.sendStatus(200)
  })
})

module.exports = router
