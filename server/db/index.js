const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const connection = require('knex')(config)

module.exports = {
  getGardens,
  getChosenGarden
}

function getGardens (db = connection) {
  return db('gardens').select()
    .catch(err => {
      console.error(err)
      throw err
    })
}

function getChosenGarden (id, db = connection) {
  return db('gardens')
    .join('events', 'gardens.id', 'events.garden_id')
    .where('gardens.id', id)
    .first()
    .then(result =>  console.log('result: ', result))
}