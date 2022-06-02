exports.seed = (knex) =>
  knex('wombles')
    .del()
    .then(() =>
      knex('wombles').insert([
        {
          id: 88801,
          name: 'Great Uncle Bulgaria',
          characteristic_id: 99901,
          rubbish_id: 1,
        },
        {
          id: 88802,
          name: 'Tobermory',
          characteristic_id: 99902,
          rubbish_id: 2,
        },
        {
          id: 88803,
          name: 'Madame Cholet',
          characteristic_id: 99903,
          rubbish_id: 3,
        },
        {
          id: 88804,
          name: 'Orinoco',
          characteristic_id: 99904,
          rubbish_id: 4,
        },
        {
          id: 88805,
          name: 'Wellington',
          characteristic_id: 99905,
          rubbish_id: 5,
        },
        {
          id: 88806,
          name: 'Tomsk',
          characteristic_id: 99906,
          rubbish_id: 6,
        },
        {
          id: 88807,
          name: 'Bungo',
          characteristic_id: 99907,
          rubbish_id: 1,
        },
      ])
    )
