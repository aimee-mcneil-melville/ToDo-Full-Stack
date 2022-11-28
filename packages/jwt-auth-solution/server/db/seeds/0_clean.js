exports.seed = (knex) => {
  return knex('fruits').del()
    .then(() => knex('users').del())
}
