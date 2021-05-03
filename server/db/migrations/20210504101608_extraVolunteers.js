
exports.up = function (knex) {
  return knex.schema.createTable('extraVolunteers', (table) => {
    table.increments('id')
    table.integer('event_id')
    table.string('first_name')
    table.string('last_name')
  })

};

exports.down = function (knex) {
  return knex.schema.dropTable('extraVolunteers')
};
