import express from 'express'

// eslint-disable-next-line no-unused-vars
import * as db from '../db/db'

const router = express.Router()

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteComment(id)
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const comment = req.body
    await db.updateComment(id, comment)
    res.json({ id, ...comment })
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

export default router
