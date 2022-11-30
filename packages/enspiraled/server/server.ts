import path from 'node:path'
import express from 'express'

const server = express()

server.use(express.static(path.join(__dirname, 'public')))

export default server
