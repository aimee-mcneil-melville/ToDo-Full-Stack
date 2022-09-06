exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.string('auth0_id').primary()
    table.string('username')
    table.string('icon')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
