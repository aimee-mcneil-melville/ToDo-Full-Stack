const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

function listProducts (db = connection) {
  return db('products')
    .select()
}

module.exports = {
  listProducts
}
