exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.string('auth0_id').primary()
    table.string('email')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
