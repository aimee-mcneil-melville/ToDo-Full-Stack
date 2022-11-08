import path from 'node:path'
import express from 'express'

var server = express()

server.use(express.static(path.join(__dirname, 'public')))

export default server
