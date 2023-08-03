export function seed(knex) {
  return knex('fruits').del()
}
