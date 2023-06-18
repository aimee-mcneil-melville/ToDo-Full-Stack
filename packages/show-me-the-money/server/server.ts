import express from 'express'
import path from 'path'

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(path.resolve(__dirname, '../assets')))
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
  })
}

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

export default server
