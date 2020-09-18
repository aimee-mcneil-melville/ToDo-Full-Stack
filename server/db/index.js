const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const connection = require('knex')(config)

module.exports = {
  getGardens,
  getUserGarden
}

function getGardens (db = connection) {
  return db('gardens').select()
    .catch(err => {
      console.error(err)
      throw err
    })
}

function getUserGarden (id, db = connection) {
  return db('gardens')
    .where('gardens.id', id)
    .join('events', 'gardens.id', 'events.garden_id')
    // .first()
    // .then(result =>  console.log('result: ', result))
}