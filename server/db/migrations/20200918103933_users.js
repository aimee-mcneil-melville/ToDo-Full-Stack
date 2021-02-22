exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.integer('garden_id')
    table.string('username')
    table.string('email')
    table.string('hash')
    table.boolean('is_admin')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
