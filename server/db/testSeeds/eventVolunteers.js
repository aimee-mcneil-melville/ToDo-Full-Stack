exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('eventVolunteers').del()
    .then(function () {
      // Inserts seed entries
      return knex('eventVolunteers').insert([
        { id: 1, user_id: 1, event_id: 1, attended: false },
        { id: 2, user_id: 2, event_id: 3, attended: false },
        { id: 3, user_id: 3, event_id: 3, attended: false }
      ])
    })
}
