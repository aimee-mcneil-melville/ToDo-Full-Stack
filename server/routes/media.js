const express = require('express')

const db = require('../db/media')

const router = express.Router()

// GET /api/v1/media/getMedia/id
// Songs list
router.get('/getMedia/:id', (req, res) => {
  db.getMedia(req.params.id)
    .then(results => {
      res.json(results)
      return null
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

// Add song
// GET /api/v1/media/
// POST /api/v1/media/
router.get('/getMedia/:id/add', (req, res) => {
  let songData = {}
  db.getSongData(songData)
    .then((result) => {
      songData = result
      return null
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Song failed to get' })
    })
})

router.post('/getMedia/:id/add', (req, res) => {
  const { media_name: mediaName, genre, artist, comment, link } = req.body
  const songData = { mediaName, genre, artist, comment, link }
  db.postSongData(songData)
    .then((result) => {
      res.json(result)
      return null
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Song failed to get' })
    })
})

// edit route

// delete route

module.exports = router
