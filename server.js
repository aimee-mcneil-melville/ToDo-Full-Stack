const path = require('path')
const express = require('express')

const server = express()

// http://expressjs.com/en/starter/static-files.html
server.use(express.static('public'))

server.get('/compliment', (req, res) => {
  res.send('<h1>you are a beautiful human</h1>')
})

server.get('/profile', (req, res) => {
  const name = req.query.name
  if (!name) res.redirect('/compliment')

  const filePath = path.join(__dirname, 'public', name.toLowerCase() + '.html')
  res.sendFile(filePath)
})

server.get('/profiles/:id', (req, res) => {
  const id = req.params.id

  const users = {
    1: 'silvia',
    2: 'sampson'
  }

  const name = users[id]
  const filePath = path.join(__dirname, 'public', name + '.html')
  res.sendFile(filePath)
})

module.exports = server
