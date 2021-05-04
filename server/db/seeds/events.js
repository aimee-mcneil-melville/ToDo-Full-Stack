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
        volunteers_needed: 4
      },
      {
        id: 8,
        garden_id: 2,
        title: 'Zen Gardens',
        date: '2021-04-29',
        description: 'Come and hear a talk on how to set up your own zen garden.',
        volunteers_needed: 6
      },
      {
        id: 9,
        garden_id: 2,
        title: 'Collecting Cucumbers',
        date: '2020-02-14',
        description: 'The time is right to pick some cucumbers.',
        volunteers_needed: 8
      },
      {
        id: 10,
        garden_id: 3,
        title: 'Wicked Wicked Weeds',
        date: '2021-05-07',
        description: 'Those pesky weeds are back. Come and help us keep our garden beautiful',
        volunteers_needed: 8
      },
      {
        id: 11,
        garden_id: 3,
        title: 'Giant Pumpkins',
        date: '2021-02-27',
        description: 'There is something in the soil here, these pumpkins are massive.',
        volunteers_needed: 8
      }
      ])
    })
}
