exports.up = function (knex) {
  return knex.schema.table('wombles', function (table) {
    table.integer('trait_id')
  })
}

exports.down = function (knex) {
  return knex.schema.table('wombles', function (table) {
    table.dropColumn('trait_id')
  })
}
