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
// GET /api/v1/media/getMedia/id/add
// router.get('/getMedia/:id/add', (req, res) => {
//   let songData = {}
//   db.addSong(songData)
//     .then((result) => {
//       songData = result
//       return null
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({ message: 'Song failed to get' })
//     })
// })

// POST /api/v1/media/getMedia/id/add
router.post('/getMedia/:id/add', (req, res) => {
  const { media_name: mediaName, genre, artist, comment, link } = req.body
  const songData = { mediaName, genre, artist, comment, link }
  db.addSong(songData)
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
  db.editSong(editSongData)
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
