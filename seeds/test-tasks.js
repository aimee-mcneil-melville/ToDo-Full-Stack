exports.seed = (knex) => {
  return knex('todos').del()
    .then(() => {
      return Promise.all([
        knex('todos').insert({ id: 1, task: 'groceries' }),
        knex('todos').insert({ id: 2, task: 'laundry' }),
        knex('todos').insert({ id: 3, task: 'mow lawn' })
      ])
    })
}
