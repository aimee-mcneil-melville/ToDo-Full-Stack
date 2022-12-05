import path from 'path'
import express from 'express'

const server = express()

server.use(express.static(path.join(__dirname, 'public')))

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

export default server
