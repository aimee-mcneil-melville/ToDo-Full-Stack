exports.up = function (knex) {
  return knex.schema.createTable('blogs', table => {
    table.increments('id').primary()
    table.integer('garden_id').references('gardens.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('blogs')
}
