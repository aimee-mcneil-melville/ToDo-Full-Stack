var express = require('express')

var app = express()

app.get('/compliment', function(req, res) {
  res.send("<h1>you are a beautiful human</h1>")
})

module.exports = app

