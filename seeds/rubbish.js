exports.seed = function (knex, Promise) {
  return knex('rubbish').del()
    .then(function () {
      return Promise.all([
        knex('rubbish').insert({name: 'polystyrene'}),
        knex('rubbish').insert({name: 'tin can'}),
        knex('rubbish').insert({name: 'nappy'}),
        knex('rubbish').insert({name: 'coffee cup'}),
        knex('rubbish').insert({name: 'plastic'}),
        knex('rubbish').insert({name: 'dust'})
      ])
    })
}
