const path = require('path')
const express = require('express')

const server = express()

server.use(express.static(path.join(__dirname, 'public')))

// BrowserRouter is recommended (over HashRouter) unless you don't have a server
// This is the BrowserRouter config
server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
