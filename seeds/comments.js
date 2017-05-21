
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('Comments').insert([
        { id: 1, post_id: 123, date_posted: '22/08/2016', comment: 'Great blog' },
        { id: 2, post_id: 123, date_posted: '25/08/2016', comment: 'Really Great blog' },
        { id: 3, post_id: 125, date_posted: '22/07/2016', comment: 'Extremely great blog' }
      ]);
    });
};
