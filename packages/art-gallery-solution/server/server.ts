import express from 'express'
import data from './data/art.ts'

const server = express()

server.get('/api/v1/artwork', (req, res) => {
  res.json(data)
})

server.get('/api/v1/artwork/:id', (req, res) => {
  const artwork = data.find((aw) => aw.id === Number(req.params.id))
  if (!artwork) {
    res.sendStatus(404)
    return
  }

  res.json(artwork)
})

export default server

// Routes
