export async function up(knex) {
  await knex.schema.createTable('orders_products', (table) => {
    table.integer('product_id').references('products.id')
    table.integer('order_id').references('orders.id')
    table.integer('quantity')
    table.timestamps(true, true)
  })
}

export async function down(knex) {
  await knex.schema.dropTable('orders_products')
}
