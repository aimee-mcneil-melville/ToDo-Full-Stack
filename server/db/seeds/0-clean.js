exports.seed = knex => {
  const empty = table =>
    () => knex(table).del()

  return empty('products')()
  // .then(empty('table_name'))
}
