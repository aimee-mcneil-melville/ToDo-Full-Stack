exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('event_volunteers')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('event_volunteers').insert([
        { id: 1, user_id: 1, event_id: 1, attended: false },
        { id: 2, user_id: 2, event_id: 1, attended: false },
        { id: 3, user_id: 3, event_id: 1, attended: false },
        { id: 4, user_id: 1, event_id: 2, attended: false },
        { id: 5, user_id: 2, event_id: 2, attended: false },
        { id: 6, user_id: 3, event_id: 2, attended: false },
        { id: 7, user_id: 1, event_id: 3, attended: false },
        { id: 8, user_id: 2, event_id: 3, attended: false },
        { id: 9, user_id: 3, event_id: 3, attended: false },
        { id: 14, user_id: 1, event_id: 6, attended: false },
        { id: 15, user_id: 1, event_id: 6, attended: false },
        { id: 16, user_id: 1, event_id: 6, attended: false },
        { id: 17, user_id: 1, event_id: 6, attended: false },
        { id: 18, user_id: 1, event_id: 6, attended: false },
        { id: 19, user_id: 1, event_id: 6, attended: false },
        { id: 20, user_id: 1, event_id: 8, attended: false },
        { id: 21, user_id: 1, event_id: 8, attended: false },
        { id: 22, user_id: 1, event_id: 8, attended: false },
        { id: 23, user_id: 1, event_id: 8, attended: false },
        { id: 24, user_id: 1, event_id: 8, attended: false },
        { id: 25, user_id: 1, event_id: 8, attended: false },
        { id: 26, user_id: 1, event_id: 8, attended: false },
        { id: 27, user_id: 1, event_id: 8, attended: false },
        { id: 28, user_id: 1, event_id: 8, attended: false },
        { id: 29, user_id: 1, event_id: 9, attended: false },
        { id: 30, user_id: 1, event_id: 9, attended: false },
        { id: 31, user_id: 1, event_id: 9, attended: false },
        { id: 32, user_id: 1, event_id: 15, attended: false },
        // below lines violate the foreign key constraints
        // { id: 33, user_id: 1, event_id: 15, attended: false },
        // { id: 34, user_id: 1, event_id: 15, attended: false },
        // { id: 35, user_id: 1, event_id: 15, attended: false },
        // { id: 36, user_id: 1, event_id: 15, attended: false },
        // { id: 37, user_id: 1, event_id: 15, attended: false },
        // { id: 38, user_id: 1, event_id: 16, attended: false },
        // { id: 39, user_id: 1, event_id: 16, attended: false }
      ])
    })
}
