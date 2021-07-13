exports.up = function (knex) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('is_admin')
    table.renameColumn('hash', 'auth0_id')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('users', table => {
    table.Column('is_admin')
    table.renameColumn('auth0_id', 'hash')
  })
}
