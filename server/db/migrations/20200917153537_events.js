exports.up = (knex) => {
  return knex.schema.createTable('events', (table) => {
    table.increments('id')
    table.integer('garden_id').references('gardens.id')
    table.string('title')
    table.string('date')
    table.string('description')
    table.integer('volunteers_needed')
    table.string('status')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('events')
}
