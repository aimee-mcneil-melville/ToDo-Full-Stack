var express = require('express')
var path = require('path')

var app = express()

app.get('/compliment', function(req, res) {
  res.send("<h1>you are a beautiful human</h1>")
})

app.get('/profile', function(req, res) {
  var name = req.query.name

  var filePath = path.join(__dirname, 'public', name + '.html')
  res.sendFile(filePath)
})

module.exports = app

