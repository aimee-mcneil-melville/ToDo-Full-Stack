exports.up = function (knex, Promise) {
  return knex.schema.table('wombles', function (table) {
    table.integer('characteristic_id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('wombles', function (table) {
    table.dropColumn('characteristic_id')
  })
}
