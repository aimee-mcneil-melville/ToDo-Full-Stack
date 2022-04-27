const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getLocations,
}

function getLocations(db = connection) {
  // TODO: use knex to get the real location data from the database
}

// TODO: write some more database functions
