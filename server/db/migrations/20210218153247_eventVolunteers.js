exports.up = function (knex) {
  return knex.schema.createTable('eventVolunteers', (table) => {
    table.increments('id')
    table.integer('user_id')
    table.integer('event_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('eventVolunteers')
}