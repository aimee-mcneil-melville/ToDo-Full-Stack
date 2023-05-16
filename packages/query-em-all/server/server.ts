import { join } from 'node:path'
import express from 'express'

import redditRoutes from './reddit'
const server = express()

server.use(express.static(join(__dirname, 'public')))
server.use(express.json())

server.use('/api/v1/reddit', redditRoutes)

export default server
