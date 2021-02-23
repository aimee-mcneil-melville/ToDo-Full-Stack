exports.up = function (knex) {
  return knex.schema.createTable('eventVolunteers', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references('users.id')
    table.integer('event_id').references('events.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('eventVolunteers')
}
