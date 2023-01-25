exports.up = (knex) => {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id')
    table.string('status')
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('orders')
}
