exports.seed = function (knex, Promise) {
  return knex('rubbish').del()
    .then(function () {
      return Promise.all([
        knex('rubbish').insert({id: 1, name: 'polystyrene'}),
        knex('rubbish').insert({id: 2, name: 'tin can'}),
        knex('rubbish').insert({id: 3, name: 'nappy'}),
        knex('rubbish').insert({id: 4, name: 'coffee cup'}),
        knex('rubbish').insert({id: 5, name: 'plastic'}),
        knex('rubbish').insert({id: 6, name: 'dust'})
      ])
    })
}
