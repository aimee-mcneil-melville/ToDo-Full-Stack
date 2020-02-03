exports.up = (knex) => {
  return knex.schema.createTable('Posts', function (table) {
    table.increments().primary()
    table.string('title')
    table.date('date_created')
    table.integer('comment_count').defaultsTo(0)
    table.string('paragraphs')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('Posts')
}
