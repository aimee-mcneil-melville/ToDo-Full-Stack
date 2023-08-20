export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Comments')
    .del()
    .then(() => knex('Posts').del())
}
