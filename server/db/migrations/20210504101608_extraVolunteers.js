exports.up = function (knex) {
  return knex.schema.createTable('extra_volunteers', (table) => {
    table.increments('id')
    table.integer('event_id').references('events.id')
    table.string('first_name')
    table.string('last_name')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('extra_volunteers')
}
