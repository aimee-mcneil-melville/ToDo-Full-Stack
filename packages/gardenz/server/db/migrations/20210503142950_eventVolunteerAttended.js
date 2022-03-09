exports.up = function (knex) {
  return knex.schema.alterTable('event_volunteers', (table) => {
    table.boolean('attended')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('event_volunteers', (table) => {
    table.dropColumn('attended')
  })
}
