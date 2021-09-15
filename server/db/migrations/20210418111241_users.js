exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('first_name')
    table.string('last_name')
    table.string('nickname')
    table.string('email')
    table.string('username')
    table.string('hash')
    table.boolean('public')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
