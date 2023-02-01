exports.up = (knex) => {
  return knex.schema.createTable('Posts', (table) => {
    table.increments().primary()
    table.string('title')
    table.date('date_created')
    table.string('text')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('Posts')
}
