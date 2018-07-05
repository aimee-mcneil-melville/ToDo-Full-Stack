exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('Comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('Comments').insert([
        {
          id: 1,
          post_id: 123,
          date_posted: new Date(Date.now()),
          comment: 'Great blog'
        },
        {
          id: 2,
          post_id: 123,
          date_posted: new Date(Date.now()),
          comment: 'Really Great blog'
        },
        {
          id: 3,
          post_id: 125,
          date_posted: new Date(Date.now()),
          comment: 'Extremely great blog'
        }
      ])
    })
}
