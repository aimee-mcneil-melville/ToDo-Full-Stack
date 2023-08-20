export async function seed(knex) {
  await knex('products').del()
}
