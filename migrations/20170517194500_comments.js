exports.up = (knex) => {
  return knex.schema.createTable('Comments', function (table) {
    table.increments().primary()
    table.integer('post_id').references('Posts.id')
    table.date('date_posted')
    table.string('comment')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('Comments')
}
