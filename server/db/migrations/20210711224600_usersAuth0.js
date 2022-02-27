exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.renameColumn('hash', 'auth0_id')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.renameColumn('auth0_id', 'hash')
  })
}
