exports.up = (knex) => {
  return knex.schema.createTable('follower_list', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references('users.id')
    table.integer('following_id')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('follower_list')
}
