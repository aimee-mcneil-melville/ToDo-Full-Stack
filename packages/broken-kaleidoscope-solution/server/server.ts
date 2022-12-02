import { join } from 'node:path'
import express from 'express'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, './public')))

export default server
