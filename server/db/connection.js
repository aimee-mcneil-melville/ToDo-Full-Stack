const environment = process.env.NODE_ENV || 'e2e'
console.log(environment)
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = connection
