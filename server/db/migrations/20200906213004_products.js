exports.up = knex => {
  return knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('description')
    table.string('name')
    table.string('country')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('products')
}
