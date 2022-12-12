const express = require('express')
const hbs = require('express-handlebars')
const { join } = require('node:path')

const routes = require('./routes')

const server = express()
server.engine('hbs', hbs())
server.set('view engine', 'hbs')
server.set('views', join(__dirname, 'views'))
server.use(express.urlencoded({ extended: true }))
server.use('/', routes)

module.exports = server
