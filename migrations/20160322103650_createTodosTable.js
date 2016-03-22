exports.up = function(knex, Promise) {
  console.log('create table')

  return knex.schema.createTableIfNotExists('todos', function(table) {
    table.increments('id')
    table.string('task')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('todos').then(function () {
    console.log('todos table was dropped')
  })
};
