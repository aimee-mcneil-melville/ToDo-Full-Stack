export async function seed (knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      auth0_id: 'auth0|61414f84d35ac900717bc280',
      name: 'kelmarna',
      email: 'kelmarna@email.nz',
      description: 'the awesome developer',
    },
  ])
}
