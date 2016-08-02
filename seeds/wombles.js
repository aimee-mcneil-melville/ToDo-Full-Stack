exports.seed = function (knex, Promise) {
  return knex('wombles').del()
    .then(function () {
      return Promise.all([
        knex('wombles').insert({id: 88801, name: 'Great Uncle Bulgaria', characteristic_id: 99901 }),
        knex('wombles').insert({id: 88802, name: 'Tobermory', characteristic_id: 99902}),
        knex('wombles').insert({id: 88803, name: 'Madame Cholet', characteristic_id: 99903}),
        knex('wombles').insert({id: 88804, name: 'Orinoco', characteristic_id: 99904}),
        knex('wombles').insert({id: 88805, name: 'Wellington', characteristic_id: 99905}),
        knex('wombles').insert({id: 88806, name: 'Tomsk', characteristic_id: 99906}),
        knex('wombles').insert({id: 88807, name: 'Bungo', characteristic_id: 99907})
      ])
    })
}
