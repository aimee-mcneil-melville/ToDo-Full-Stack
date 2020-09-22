exports.up = (knex) => {
  return knex.schema.createTable('events', table => {
    table.increments('id')
    table.string('garden_id')
    table.string('title')
    table.string('date')
    table.string('description')
    table.string('volunteers_needed')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('events')
}
