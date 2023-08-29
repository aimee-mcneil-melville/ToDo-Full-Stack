export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('widgets')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('widgets').insert([
        {
          id: 1,
          name: 'Red widget',
          price: 23.45,
          mfg: 'Acme Inc.',
          inStock: 4,
          rating: 3,
        },
        {
          id: 2,
          name: 'Blue widget',
          price: 423.47,
          mfg: 'Acme Inc.',
          inStock: 8,
          rating: 4,
        },
        {
          id: 3,
          name: 'Yellow widget',
          price: 123.4,
          mfg: 'Acme Inc.',
          inStock: 3,
          rating: 2,
        },
      ])
    })
}
