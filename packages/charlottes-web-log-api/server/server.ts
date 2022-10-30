import path from 'path'
import express from 'express'

import posts from './routes/posts'
import comments from './routes/comments'

const server = express()
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.json())

server.use('/v1/posts', posts)
server.use('/v1/comments', comments)
server.use('/v1/*', (req, res) => res.sendStatus(404))

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

export default server
