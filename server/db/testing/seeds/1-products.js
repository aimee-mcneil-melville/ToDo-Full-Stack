exports.seed = knex => {
  return knex('products').insert([
    {
      id: 1,
      name: 'test product 1',
      description: 'test description 1',
      country: 'test country 1'
    },
    {
      id: 2,
      name: 'test product 2',
      description: 'test description 2',
      country: 'test country 2'
    },
    {
      id: 3,
      name: 'test product 3',
      description: 'test description 3',
      country: 'test country 3'
    }
  ])
}
