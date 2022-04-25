const data = require('../data/locations.json')

exports.seed = async function (knex) {
  await knex('locations').del()
  await knex('locations').insert(data)
}
