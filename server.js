var express = require('express')

var app = express()

app.get('/message', function (req, res) {
  res.send('hello')
})


module.exports = app






