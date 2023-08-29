export async function seed(knex) {
  await knex('Comments').insert([
    {
      id: 1,
      post_id: 123,
      date_posted: new Date(Date.now()),
      comment: 'Great blog',
    },
    {
      id: 2,
      post_id: 123,
      date_posted: new Date(Date.now()),
      comment: 'Really great blog',
    },
    {
      id: 3,
      post_id: 125,
      date_posted: new Date(Date.now()),
      comment: 'Extremely great blog',
    },
  ])
}
