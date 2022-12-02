exports.up = (knex) => {
  return knex.schema.createTable('orders_products', (table) => {
    table.integer('product_id').references('products.id')
    table.integer('order_id').references('orders.id')
    table.integer('quantity')
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('orders_products')
}
