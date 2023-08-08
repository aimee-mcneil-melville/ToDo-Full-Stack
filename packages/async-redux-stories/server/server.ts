import * as Path from 'node:path'
import express from 'express'

import redditRoutes from './reddit.ts'
const server = express()

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(Path.resolve(__dirname, '../assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve(__dirname, '../index.html'))
  })
}

server.use('/api/v1/reddit', redditRoutes)

export default server
