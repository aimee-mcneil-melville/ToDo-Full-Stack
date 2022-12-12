const { join } = require('node:path')
const express = require('express')

const posts = require('./routes/posts')
const comments = require('./routes/comments')

const server = express()
server.use(express.static(join(__dirname, 'public')))
server.use(express.json())

server.use('/v1/posts', posts)
server.use('/v1/comments', comments)
server.use('/v1/*', (req, res) => res.sendStatus(404))

server.get('*', (req, res) => {
  res.sendFile(join(__dirname, './public/index.html'))
})

module.exports = server
