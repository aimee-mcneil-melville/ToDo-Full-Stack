import express from 'express'
import request from 'superagent'

const router = express.Router()

router.use(express.json())

router.get('/subreddit/:subreddit', (req, res) => {
  request
    .get(`http://www.reddit.com/r/${req.params.subreddit}.json`)
    .then((result) => {
      res.json(result.body.data.children)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

export default router
