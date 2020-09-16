exports.up = (knex) => {
  return knex.schema.createTable('gardens', table => {
    table.increments('id')
    table.string('name')
    table.string('address')
    table.decimal('lat', 2, 14)
    table.decimal('lon', 2, 14)
    table.string('url')
  })
};

exports.down = (knex) => {
  return knex.schema.dropTable('gardens')
};
