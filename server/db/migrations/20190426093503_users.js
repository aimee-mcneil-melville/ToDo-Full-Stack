exports.up = (knex) => {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('username')
    table.binary('hash')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
