exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('user_name')
    table.string('first_name')
    table.string('last_name')
    table.decimal('hourly_wage')
    table.string('hash')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
