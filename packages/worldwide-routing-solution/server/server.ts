import { join, resolve } from 'node:path'
import express from 'express'

const server = express()

server.use(express.static(join(__dirname, 'public')))

server.get('*', (req, res) => {
  res.sendFile(resolve('server/public/index.html'))
})

export default server
