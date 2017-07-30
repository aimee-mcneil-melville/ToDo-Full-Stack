var express = require('express')
var bodyParser = require('body-parser')

var environment = process.env.NODE_ENV || 'development'
var config = require('./knexfile')[environment]
var knex = require('knex')(config)

var users = require('./routes/users')

var server = express()

server.set('knex', knex)
module.exports = server

// Middleware
server.use(bodyParser.json())

// Routes
server.use('/users', users)
