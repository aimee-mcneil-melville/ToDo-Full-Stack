
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('todos').del(), 

    // Inserts seed entries
    knex('todos').insert({id: 1, task: 'clean my room'}),
    knex('todos').insert({id: 2, task: 'make dinner'}),
    knex('todos').insert({id: 3, task: 'watch the wire'})
  );
};
