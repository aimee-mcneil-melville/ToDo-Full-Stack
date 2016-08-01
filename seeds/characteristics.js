exports.seed = function (knex, Promise) {
  return knex('characteristics').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('characteristics').insert({description: 'glasses'}),
        knex('characteristics').insert({description: 'hat'}),
        knex('characteristics').insert({description: 'scarf'}),
        knex('characteristics').insert({description: 'necklace'}),
        knex('characteristics').insert({description: 'waistcoat'})
      ]);
    });
};
