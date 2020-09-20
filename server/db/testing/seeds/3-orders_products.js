exports.seed = knex => {
  return knex('orders_products').insert([
    {
      order_id: 1,
      product_id: 2,
      quantity: 4
    },
    {
      order_id: 1,
      product_id: 3,
      quantity: 1
    },
    {
      order_id: 2,
      product_id: 1,
      quantity: 2
    },
    {
      order_id: 3,
      product_id: 2,
      quantity: 8
    }
  ])
}
