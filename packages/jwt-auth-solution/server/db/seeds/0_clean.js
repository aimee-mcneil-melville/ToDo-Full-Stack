export async function seed(knex) {
  await knex('fruits').del()
  await knex('users').del()
}
