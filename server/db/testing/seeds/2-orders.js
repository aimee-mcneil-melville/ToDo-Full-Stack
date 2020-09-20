exports.seed = knex => {
  return knex('orders').insert([
    {
      id: 1,
      created_at: 1599690765763,
      status: 'cancelled'
    },
    {
      id: 2,
      created_at: 1600077799260,
      status: 'pending'
    },
    {
      id: 3,
      created_at: 1600502296481,
      status: 'pending'
    }
  ])
}
