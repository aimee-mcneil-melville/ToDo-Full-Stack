const express = require('express')
const router = express.Router()

const db = require('../db/db')
const bodyParser = require('body-parser')

router.use(bodyParser.json())

// router.put('/:id', (req, res) => {
//   db.updateCommentById(req.params.id, { comment: req.body.comment })
//     .then(updatedComment => {
//       res.json(updatedComment)
//     })
// })
// 
// router.delete('/:id', (req, res) => {
//   db.deleteCommentById(req.params.id)
//     .then(() => {
//       res.json({})
//     })
// })

module.exports = router