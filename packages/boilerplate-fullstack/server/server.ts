import express from 'express'
import path from 'path'

import fruitRoutes from './routes/fruits'

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/fruits', fruitRoutes)

export default server
