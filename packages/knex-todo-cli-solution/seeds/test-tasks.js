export async function seed(knex) {
  await knex('todos').del()
  await knex('todos').insert([
    { id: 1, task: 'groceries' },
    { id: 2, task: 'laundry' },
    { id: 3, task: 'mow lawn' },
  ])
}
