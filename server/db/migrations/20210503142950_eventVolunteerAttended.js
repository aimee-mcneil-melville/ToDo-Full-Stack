exports.up = function (knex) {
  return knex.schema.alterTable('eventVolunteers', (table) => {
    table.boolean('attended')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('eventVolunteers', (table) => {
    table.dropColumn('attended')
  })
}
