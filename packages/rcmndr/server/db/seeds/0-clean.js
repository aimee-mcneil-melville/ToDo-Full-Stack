exports.seed = function (knex, Promise) {
  const empty = table =>
    () => knex(table).del()

  return empty('media_list')()
    .then(empty('follower_list'))
    .then(empty('users'))
  // Chain calls to empty in
  // order as required, e.g.:
  // .then(empty('profiles'))
}
