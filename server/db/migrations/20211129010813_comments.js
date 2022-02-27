exports.up = function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary()
    table.integer('post_id').references('posts.id')
    table.integer('author').references('users.id')
    table.datetime('created_on')
    table.string('content')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('comments')
}
