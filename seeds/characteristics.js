exports.seed = function (knex, Promise) {
  return knex('characteristics').del()
    .then(function () {
      return Promise.all([
        knex('characteristics').insert({id: 99901, description: 'wise'}),
        knex('characteristics').insert({id: 99902, description: 'handy'}),
        knex('characteristics').insert({id: 99903, description: 'french'}),
        knex('characteristics').insert({id: 99904, description: 'lazy'}),
        knex('characteristics').insert({id: 99905, description: 'clever'}),
        knex('characteristics').insert({id: 99906, description: 'sporty'}),
        knex('characteristics').insert({id: 99907, description: 'bossy'})
      ]);
    });
};
