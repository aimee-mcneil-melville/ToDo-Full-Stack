import path from 'path'
import express from 'express'

import welcome from './routes/welcome'

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/v1/welcome', welcome)

export default server
