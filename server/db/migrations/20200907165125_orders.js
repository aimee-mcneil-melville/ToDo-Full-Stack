exports.up = knex => {
  return knex.schema.createTable('orders', table => {
    table.increments('id')
    table.date('created_at')
    table.string('status')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('orders')
}
