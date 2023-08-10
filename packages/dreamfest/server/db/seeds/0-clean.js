export async function seed(knex) {
  await knex('events').del()
  await knex('locations').del()
}
