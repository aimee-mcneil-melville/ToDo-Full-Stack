exports.seed = function (knex) {
  const todayDate = new Date().toLocaleDateString('en-NZ')
  const diffDate = (days) => {
    const newDate = new Date(
      new Date().getTime() + days * 86400000
    ).toLocaleDateString('en-NZ')
    return newDate
  }
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          garden_id: 1,
          author: 2,
          title: 'Lettuce Picking Season',
          created_on: todayDate,
          content:
            'We all gathered today to do the community work of harvesting lettuce. Thanks to all the lettuce heads for showing up!',
        },
        {
          id: 2,
          garden_id: 1,
          author: 1,
          title: 'Where are my CABBAGES',
          created_on: diffDate(1),
          content: 'We all just want cabbage soup in the end, right?',
        },
      ])
    })
}
