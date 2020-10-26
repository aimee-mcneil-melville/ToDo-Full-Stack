exports.seed = knex =>
  knex('characteristics').del()
    .then(() =>
      knex('characteristics').insert([
        { id: 99901, description: 'wise' },
        { id: 99902, description: 'handy' },
        { id: 99903, description: 'french' },
        { id: 99904, description: 'lazy' },
        { id: 99905, description: 'clever' },
        { id: 99906, description: 'sporty' },
        { id: 99907, description: 'bossy' }
      ]))
