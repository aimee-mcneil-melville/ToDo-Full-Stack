exports.seed = (knex) => {
  const todayDate = new Date().toLocaleDateString('en-NZ')
  const diffDate = (days) => {
    const newDate = new Date(
      new Date().getTime() + days * 86400000
    ).toLocaleDateString('en-NZ')
    return newDate
  }

  return knex('events')
    .del()
    .then(() => {
      return knex('events').insert([
        {
          id: 1,
          garden_id: 2,
          title: 'Weeding worker Bee',
          date: todayDate,
          description: 'It is time to get these weeds under control.',
          volunteers_needed: 16,
          status: 'Active',
        },
        {
          id: 2,
          garden_id: 2,
          title: 'Sowing potatoes',
          date: diffDate(1),
          description: 'Help get these lovely potatoes out of the ground!',
          volunteers_needed: 24,
          status: 'Active',
        },
        {
          id: 3,
          garden_id: 2,
          title: 'Sowing potatoes',
          date: diffDate(-60),
          description: 'Help get these lovely potatoes out of the ground!',
          volunteers_needed: 14,
          status: 'Active',
        },
        {
          id: 4,
          garden_id: 1,
          title: 'Hanging out',
          date: todayDate,
          description: 'Bring your snacks and beverages.',
          volunteers_needed: 24,
          status: 'Active',
        },
        {
          id: 5,
          garden_id: 2,
          title: 'Hanging out',
          date: diffDate(365),
          description: 'Bring your snacks, beverages and stories.',
          volunteers_needed: 24,
          status: 'Active',
        },
        {
          id: 6,
          garden_id: 2,
          title: 'Party at the garden',
          date: diffDate(-365),
          description: 'Bring your snacks, beverages and stories.',
          volunteers_needed: 24,
          status: 'Active',
        },
        {
          id: 7,
          garden_id: 1,
          title: 'Zen Gardens',
          date: diffDate(740),
          description:
            'Come and hear a talk on how to set up your own zen garden.',
          volunteers_needed: 6,
          status: 'Active',
        },
        {
          id: 8,
          garden_id: 2,
          title: 'Collecting Cucumbers',
          date: diffDate(-900),
          description: 'The time is right to pick some cucumbers.',
          volunteers_needed: 8,
          status: 'Active',
        },
        {
          id: 9,
          garden_id: 2,
          title: 'Giant Pumpkins',
          date: diffDate(10000),
          description:
            'There is something in the soil here, these pumpkins are massive.',
          volunteers_needed: 8,
          status: 'Active',
        },
      ])
    })
}
