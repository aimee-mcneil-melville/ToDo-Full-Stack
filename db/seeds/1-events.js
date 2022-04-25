const data = require('../data/events.json')

exports.seed = async function (knex) {
  await knex('events').del()
  await knex('events').insert(data)
}
