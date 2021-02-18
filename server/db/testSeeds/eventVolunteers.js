exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('eventVolunteers').del()
    .then(function () {
      // Inserts seed entries
      return knex('eventVolunteers').insert([
        { id: 1, username: 'Steve', event_id: 1 },
        { id: 2, username: 'Anna', event_id: 2 },
        { id: 3, username: 'Constantinople', event_id: 3 }
      ])
    })
}
