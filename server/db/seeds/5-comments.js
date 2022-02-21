exports.seed = function (knex) {
  const todayDate = new Date().toLocaleDateString('en-NZ')
  const diffDate = (days) => {
    const newDate = new Date(
      new Date().getTime() + days * 86400000
    ).toLocaleDateString('en-NZ')
    return newDate
  }

  // Deletes ALL existing entries
  return knex('comments')
    .del()
    .then(function () {
      // Inserts seed entries

      return knex('comments').insert([
        {
          id: 1,
          post_id: 1,
          author: 2,
          created_on: diffDate(1),
          content: 'Twas a wonderful day for lettuce picking!',
        },
        {
          id: 2,
          post_id: 2,
          author: 1,
          created_on: todayDate,
          content:
            'Would have been a wonderful day for picking cabbages if any of the volunteers had shown up >:(',
        },
      ])
    })
}
