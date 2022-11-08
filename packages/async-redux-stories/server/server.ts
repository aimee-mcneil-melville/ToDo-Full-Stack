import path from 'path'
import express from 'express'

import redditRoutes from './reddit'
const server = express()

server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/reddit', redditRoutes)

export default server
