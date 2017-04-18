var express = require('express')
var router = express.Router()

var development = require('./knexfile').development
var knex = require('knex')(development)

router.get('/', function (req, res) {
  res.send('WOMBLES!')
})

module.exports = router
