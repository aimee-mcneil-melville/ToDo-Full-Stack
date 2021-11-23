exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.integer('garden_id')
    table.string('first_name')
    table.string('last_name')
    table.string('username')
    table.string('email')
    table.string('hash')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
