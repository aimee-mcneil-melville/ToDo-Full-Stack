const express = require('express')
const { join } = require('node:path')

const usersRoutes = require('./routes/users')

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/users', usersRoutes)

server.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

module.exports = server
