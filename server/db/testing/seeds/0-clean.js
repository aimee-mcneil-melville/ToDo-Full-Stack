exports.seed = knex => {
  const empty = table =>
    () => knex(table).del()

  return empty('orders_products')()
    .then(empty('orders'))
    .then(empty('products'))
}
