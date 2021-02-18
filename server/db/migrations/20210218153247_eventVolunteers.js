exports.up = function (knex) {
  return knex.schema.createTable('eventVolunteers', (table) => {
    table.increments('id')
    table.string('username').references('users.username')
    table.integer('event_id').references('events.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('eventVolunteers')
}
