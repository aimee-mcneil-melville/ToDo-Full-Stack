exports.seed = (knex) => {
  return knex('fruits')
    .del()
    .then(() => {
      return knex('fruits').insert([
        { id: 1, name: 'Banana', average_grams_each: 120, added_by_user: 1 },
        { id: 2, name: 'Apple', average_grams_each: 195, added_by_user: 2 },
        { id: 3, name: 'Feijoa', average_grams_each: 50, added_by_user: 1 },
      ])
    })
}
