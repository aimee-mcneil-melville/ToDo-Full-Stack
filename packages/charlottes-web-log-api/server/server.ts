import * as path from 'node:path'
import express from 'express'

import posts from './routes/posts.ts'
import comments from './routes/comments.ts'

const server = express()
server.use(express.json())

server.use('/api/v1/posts', posts)
server.use('/api/v1/comments', comments)
server.use('/api/v1/*', (req, res) => res.sendStatus(404))

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(path.resolve(__dirname, '../assets')))
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
  })
}

export default server
