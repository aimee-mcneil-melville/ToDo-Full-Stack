import express from 'express'

// eslint-disable-next-line no-unused-vars
import * as db from '../db/db'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const posts = await db.allPosts()
    res.json(posts)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await db.getPost(Number(req.params.id))
    res.json(post)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const post = req.body
    await db.updatePost(id, post)
    res.json({ id, ...post })
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deletePost(id)
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await db.getCommentsForPost(Number(req.params.id))
    res.json(comments)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

// put routes here
export default router
