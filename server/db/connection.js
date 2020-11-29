// Test for registerUser works but only when changing the enviroment from 'development' to 'e2e'...

// But the enviroment is set in the test script and logs correctly so strange issue
const environment = process.env.NODE_ENV || 'e2e'
console.log(environment)
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = connection
