exports.seed = (knex) => {
  return knex('events').del()
    .then(() => {
      return knex('events').insert([{
        id: 1,
        garden_id: 1,
        title: 'Weeding worker Bee',
        date: '2020-08-27',
        description: 'Its time to get these weeds under control.',
        volunteers_needed: 86
      },
      {
        id: 2,
        garden_id: 1,
        title: 'Sowing Corn',
        date: '2022-08-28',
        description: 'Help get out the lovely corns in the ground!.',
        volunteers_needed: 64
      },
      {
        id: 3,
        garden_id: 2,
        title: 'Snowing Corn',
        date: '2020-08-28',
        description: 'Help get out the lovely corns in the ground!.',
        volunteers_needed: 54
      },
      {
        id: 4,
        garden_id: 2,
        title: 'Cutting down trees',
        date: '2022-08-28',
        description: 'Help get rid of our lovely maple trees. Bring your chainsaw, kids are welcome',
        volunteers_needed: 444
      },
      {
        id: 5,
        garden_id: 3,
        title: 'Chillin',
        date: '2022-08-28',
        description: 'Bring your beer and booze.',
        volunteers_needed: 34
      },
      {
        id: 6,
        garden_id: 3,
        title: 'Terminating moles',
        date: '2020-08-28',
        description: 'Our lovely garden is infested with moles. Bring some explosives and petrol',
        volunteers_needed: 24
      },
      {
        id: 7,
        garden_id: 3,
        title: 'Party at the garden',
        date: '2020-08-28',
        description: 'Help get out the lovely corns in the ground!.',
        volunteers_needed: 40
      }
    ])
    })
}
