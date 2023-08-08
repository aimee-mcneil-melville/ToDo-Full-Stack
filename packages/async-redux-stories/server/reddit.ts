import express from 'express'
import request from 'superagent'

const router = express.Router()

router.use(express.json())

router.get('/subreddit/:subreddit', async (req, res) => {
  try {
    const response = await request
        .get(`https://www.reddit.com/r/${req.params.subreddit}.json`)
        res.json(response.body.data.children)
  } catch (err) {
    res.status(500).send((err as Error).message)
  }
})

export default router
