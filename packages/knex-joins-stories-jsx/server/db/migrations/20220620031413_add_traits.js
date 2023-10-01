export function up (knex) {
  return knex.schema.table('wombles', function (table) {
    table.integer('trait_id')
  })
}

export function down(knex) {
  return knex.schema.table('wombles', function (table) {
    table.dropColumn('trait_id')
  })
}
