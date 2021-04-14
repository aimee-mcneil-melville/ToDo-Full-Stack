exports.seed = (knex) => {
  const empty = table =>
    () => knex(table).del()

  return empty('users')()
  // Chain calls to empty in
  // order as required, e.g.:
  // return empty('profiles')()
  //   .then(empty('users'))
}
