import express from 'express'
import { join } from 'node:path'

import authRoutes from './routes/auth'

const server = express()

server.use(express.json())
server.use(express.static(join('server', 'public')))

server.use('/api/v1', authRoutes)

export default server
