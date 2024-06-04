export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    { id: 1, task: 'make a coffee', completed: 'false' },
    { id: 2, task: 'destroy beanbag tower', completed: 'true' },
    { id: 3, task: 'build a treehouse', completed: 'false' },
  ])
}
