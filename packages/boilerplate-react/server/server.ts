const { join } = require('node:path')
const express = require('express')

const server = express()

server.use(express.static(join(__dirname, 'public')))

module.exports = server
