require('dotenv').config()

const Knex = require('knex')
const config = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = Knex(config)

const server = require('./server')
server.set('db', knex)
const PORT = process.env.PORT || 3000

server.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
