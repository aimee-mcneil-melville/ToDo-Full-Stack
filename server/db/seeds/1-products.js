exports.seed = knex => {
  return knex('products').insert([
    {
      id: 1,
      name: 'Sweet As Peanut Butter',
      description: 'A true crunchy extravaganza - sure to delight even the most diehard smooth fans!',
      country: 'New Zealand'
    },
    {
      id: 2,
      name: 'Sweet As Guacamole',
      description: 'Made from perfectly ripe avos and with a good dash of chilli, you\'ll be back for more!',
      country: 'New Zealand'
    },
    {
      id: 3,
      name: 'Sweet As Hummus',
      description: 'Garlic to the max - we really outdid ourselves here. Don\'t breathe too close to anyone for a while!',
      country: 'New Zealand'
    }
  ])
}
