exports.up = function (knex) {
  return knex.schema.createTable('event_volunteers', (table) => {
    table.increments('id')
    table.integer('user_id').references('users.id')
    table.integer('event_id').references('events.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('event_volunteers')
}
