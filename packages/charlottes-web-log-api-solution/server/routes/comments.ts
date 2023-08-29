import express from 'express'

// eslint-disable-next-line no-unused-vars
import { updateComment, deleteComment } from '../db/db.ts'

const router = express.Router()

router.patch('/:commentId', (req, res) => {
  const id = Number(req.params.commentId)
  const comment = req.body
  return updateComment(id, comment).then((comment) => {
    res.json(comment)
  })
})

router.delete('/:commentId', (req, res) => {
  const id = Number(req.params.commentId)
  return deleteComment(id).then(() => {
    res.sendStatus(200)
  })
})

export default router
