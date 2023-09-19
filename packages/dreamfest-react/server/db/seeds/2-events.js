export async function seed(knex) {
  await knex('events').insert([
    {
      id: 1,
      location_id: 1,
      day: 'friday',
      time: '2pm - 3pm',
      name: 'Slushie Apocalypse I',
      description:
        'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
    },
    {
      id: 2,
      location_id: 2,
      day: 'friday',
      time: '6pm - 7pm',
      name: 'LEGO Builder Championships',
      description:
        'This event will be taking place at the Yella Yurt. Come see what marvels our championship builders have built over the past 7 days!',
    },
    {
      id: 3,
      location_id: 1,
      day: 'saturday',
      time: '2pm - 3pm',
      name: 'Sandwich Eating Contest',
      description:
        'This event will be taking place at the TangleStage. Make sure you eat lunch before watching this amazing display!',
    },
    {
      id: 4,
      location_id: 2,
      day: 'saturday',
      time: '6pm - 7pm',
      name: 'Cutest Puppy Awards',
      description:
        "This event will be taking place at the Yella Yurt. You won't want to miss those cute puppy faces!",
    },
    {
      id: 5,
      location_id: 2,
      day: 'sunday',
      time: '2pm - 3pm',
      name: 'Slushie Apocalypse II: The Return',
      description:
        'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
    },
  ])
}
