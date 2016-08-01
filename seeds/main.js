exports.seed = function (knex, Promise) {
  return knex('wombles').del()
    .then(function () {
      return Promise.all([
        knex('wombles').insert({name: 'Flargle', characteristic_id: 1}),
        knex('wombles').insert({name: 'Argle', characteristic_id: 2}),
        knex('wombles').insert({name: 'Wargle', characteristic_id: 3})
      ])
    })
}
