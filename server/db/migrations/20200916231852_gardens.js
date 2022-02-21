exports.up = (knex) => {
  return knex.schema.createTable('gardens', (table) => {
    table.increments('id')
    table.string('name')
    table.string('address')
    table.string('description', 1024)
    table.decimal('lat', 17, 14)
    table.decimal('lon', 17, 14)
    table.string('url')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('gardens')
}
