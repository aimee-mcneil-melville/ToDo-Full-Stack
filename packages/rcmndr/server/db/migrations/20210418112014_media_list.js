exports.up = (knex) => {
  return knex.schema.createTable('media_list', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references('users.id')
    table.string('genre')
    table.string('media_name')
    table.string('artist')
    table.string('link')
    table.text('comment')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('media_list')
}
