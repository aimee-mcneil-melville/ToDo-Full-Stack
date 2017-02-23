var express = require('express')
var path = require('path')

var app = express()

app.get('/compliment', function(req, res) {
  res.send("<h1>you are a beautiful human</h1>")
})

app.get('/profile', function(req, res) {
  var name = req.query.name
  if (!name) res.redirect('/compliment')

  var filePath = path.join(__dirname, 'public', name.toLowerCase() + '.html')
  res.sendFile(filePath)
})

var usersTable = {
  1: 'silvia',
  2: 'sampson'
}

app.get('/profiles/:id', function(req, res) {
  var id = req.params.id

  var name = usersTable[id]
  var filePath = path.join(__dirname, 'public', name + '.html')
  res.sendFile(filePath)
})

module.exports = app

