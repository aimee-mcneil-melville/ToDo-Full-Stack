exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('blogs').del()
    .then(function () {
      // Inserts seed entries
      return knex('blogs').insert([
        { id: 1, garden_id: '1' },
        { id: 2, garden_id: '2' },
        { id: 3, garden_id: '3' }
      ])
    })
}
