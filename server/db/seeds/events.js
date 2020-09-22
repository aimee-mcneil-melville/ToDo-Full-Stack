exports.seed = (knex) => {
  return knex('events').del()
    .then(() => {
      return knex('events').insert([{
        id: 1,
        garden_id: 1,
        title: 'Weeding worker Bee',
        date: 'Wed, 27 Sep 2020 20:00:00 GMT',
        description: 'Its time to get these weeds under control.',
        volunteers_needed: 8
      },
      {
        id: 2,
        garden_id: 1,
        title: 'Sowing Corn',
        date: 'Wed, 28 Sep 2020 20:00:00 GMT',
        description: 'Help get out the lovely corns in the ground!.',
        volunteers_needed: 4
      }])
    })
}
