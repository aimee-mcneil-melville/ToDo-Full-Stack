const express = require('express')
const log = require('../logger')
const db = require('../db/posts')

const router = express.Router()
module.exports = router

router.get('/:gardenid', (req, res) => {
  db.getPostsByGardenId(Number(req.params.gardenid))
    .then((posts) => {
      res.status(200).json({ posts })
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to retrieve posts',
        },
      })
    })
})
