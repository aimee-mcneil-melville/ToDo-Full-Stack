// TODO: import a generateHash function

exports.seed = (knex) => {
  return knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        { auth0_id: 'auth0|123', email: 'banana@user.com' },
        { auth0_id: 'auth0|567', email: 'watermelon@user.com' },
      ])
    )
}
