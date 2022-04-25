exports.up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id').primary()
    table.integer('location_id').references('locations.id')
    table.string('day')
    table.string('time')
    table.string('name')
    table.string('description')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('events')
}
