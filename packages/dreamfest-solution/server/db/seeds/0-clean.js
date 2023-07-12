exports.seed = (knex) => {
  return knex('events')
    .del()
    .then(() => knex('locations').del())
}
