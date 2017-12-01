const express = require('express')
const path = require('path')

const app = express()
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

app.get('/compliment', function(req, res) {
  res.send("<h1>you are a beautiful human</h1>")
})

app.get('/profile', function(req, res) {
  const name = req.query.name
  if (!name) res.redirect('/compliment')

  const filePath = path.join(__dirname, 'public', name.toLowerCase() + '.html')
  res.sendFile(filePath)
})

app.get('/profiles/:id', function(req, res) {
  const id = req.params.id

  const usersTable = {
    1: 'silvia',
    2: 'sampson'
  }

  const name = usersTable[id]
  const filePath = path.join(__dirname, 'public', name + '.html')
  res.sendFile(filePath)
})

module.exports = app

