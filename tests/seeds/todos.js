exports.seed = function (knex) {
  return knex('todos').del()
    .then(function () {
      return knex('todos').insert([
        {id: 1, task: 'Acquire wombats.'},
        {id: 2, task: '???'},
        {id: 3, task: 'Profit.'}
      ])
    })
}
