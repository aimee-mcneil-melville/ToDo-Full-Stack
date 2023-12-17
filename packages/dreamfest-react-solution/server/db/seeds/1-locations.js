export async function seed(knex) {
  await knex('locations').insert([
    {
      id: 1,
      name: 'TangleStage',
      description: 'Not the biggest stage, but perhaps the most hip.',
    },
    {
      id: 2,
      name: 'Yella Yurt',
      description: "It's a freakin' yurt! Get in here!",
    },
    {
      id: 3,
      name: 'Puffy Paddock',
      description: 'A nice spot in the grass. Just look before you sit.',
    },
    {
      id: 4,
      name: 'Kombucha Karavan',
      description: 'Whet your whistle with some yummy living organisms.',
    },
  ])
}
