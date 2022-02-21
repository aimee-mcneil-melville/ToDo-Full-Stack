exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.integer('garden_id').references('gardens.id')
    table.integer('author').references('users.id')
    table.string('title')
    table.datetime('created_on')
    table.string('content')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('posts')
}
