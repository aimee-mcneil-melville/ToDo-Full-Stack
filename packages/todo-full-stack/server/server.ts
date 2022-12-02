import express from 'express'
import { join } from 'node:path'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

export default server
