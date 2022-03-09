const express = require('express')

const db = require('../db/media')

const router = express.Router()

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

// POST /api/v1/media/getMedia/id/add
router.post('/getMedia/:id/add', (req, res) => {
  const { songTitle, genre, artist, comment, link } = req.body.newSongData
  const userId = req.body.id
  const songData = { mediaName: songTitle, genre, artist, comment, link }
  db.addSong(userId, songData)
    .then((result) => {
      res.json(result)
      return null
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Song failed to get' })
    })
})

// PATCH /api/v1/media/getMedia/id/edit
router.patch('/getMedia/:id/edit', (req, res) => {
  const editSongData = req.body
  db.updateSong(editSongData)
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
})

// DELETE /api/v1/media/getMedia/:id
router.delete('/getMedia/:id', (req, res) => {
  const id = req.params.id
  db.deleteSong(id)
    .then(() => {
      return res.json('delete')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err.message)
    })
})

module.exports = router
