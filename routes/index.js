var express = require('express')

module.exports = {
  get: get
}

function get (req, res) {
  var data = { hi: 'Hey!' }
  res.render('index', data)
}
