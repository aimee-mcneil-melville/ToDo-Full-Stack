exports.seed = (knex) => {
  return knex('fruits').del()
}
