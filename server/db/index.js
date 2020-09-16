const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const connection = require('knex')(config)

module.exports = {
  getGardens
}

function getGardens (db = connection) {
  return db('gardens').select()
    .catch(err => {
      console.error(err)
      throw err
    })
}
