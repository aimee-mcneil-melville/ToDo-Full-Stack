/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    { id: 100, task: 'Laundry', priority: 2, completed: false },
    { id: 101, task: 'Dishes', priority: 1, completed: false },
    { id: 102, task: 'Sleep', priority: 3, completed: false },
  ])
}
