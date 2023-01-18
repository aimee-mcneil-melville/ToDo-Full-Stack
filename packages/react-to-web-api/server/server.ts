import { join } from 'node:path'
import express from 'express'
import widgets from './routes/widgets'

const server = express()
server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/widgets', widgets)

export default server
