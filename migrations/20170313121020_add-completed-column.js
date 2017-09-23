exports.up = (knex) => {
  return knex.schema.table('todos', (table) => {
    table.boolean('completed')
  })
}

exports.down = (knex) => {
  return knex.schema.table('todos', (table) => {
    table.dropColumn('completed')
  })
}
