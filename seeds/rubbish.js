exports.seed = function (knex, Promise) {
  return knex('rubbish').del()
    .then(function () {
      return Promise.all([
        knex('rubbish').insert({id: 77701, name: 'polystyrene'}),
        knex('rubbish').insert({id: 77702, name: 'tin can'}),
        knex('rubbish').insert({id: 77703, name: 'nappy'}),
        knex('rubbish').insert({id: 77704, name: 'coffee cup'}),
        knex('rubbish').insert({id: 77705, name: 'plastic'}),
        knex('rubbish').insert({id: 77706, name: 'dust'})
      ])
    })
}
