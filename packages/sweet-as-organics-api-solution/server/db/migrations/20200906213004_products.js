exports.up = (knex) => {
  return knex.schema.createTable('products', (table) => {
    table.increments('id')
    table.string('description')
    table.string('name')
    table.string('country')
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('products')
}
