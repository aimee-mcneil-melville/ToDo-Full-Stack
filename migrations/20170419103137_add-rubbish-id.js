exports.up = function (knex, Promise) {
  return knex.schema.table('wombles', function (table) {
    table.integer('rubbish_id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('wombles', function (table) {
    table.dropColumn('rubbish_id')
  })
}
