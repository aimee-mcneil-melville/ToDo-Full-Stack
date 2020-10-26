exports.seed = knex =>
  knex('rubbish').del()
    .then(() => knex('rubbish').insert([
      { id: 77701, name: 'polystyrene' },
      { id: 77702, name: 'tin can' },
      { id: 77703, name: 'nappy' },
      { id: 77704, name: 'coffee cup' },
      { id: 77705, name: 'plastic' },
      { id: 77706, name: 'dust' }
    ]))
