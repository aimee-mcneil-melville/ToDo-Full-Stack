exports.up = (knex, Promise) => {
  return knex.schema.createTableIfNotExists('Posts', function (table) {
    table.increments().primary()
    table.string('title')
    table.date('date_created')
    table.string('paragraphs')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('Posts')
}

