export const seed = (knex) =>
  knex('wombles')
    .del()
    .then(() =>
      knex('wombles').insert([
        { id: 88801, name: 'Great Uncle Bulgaria', trait_id: 99901 },
        { id: 88802, name: 'Tobermory', trait_id: 99902 },
        { id: 88803, name: 'Madame Cholet', trait_id: 99903 },
        { id: 88804, name: 'Orinoco', trait_id: 99904 },
        { id: 88805, name: 'Wellington', trait_id: 99905 },
        { id: 88806, name: 'Tomsk', trait_id: 99906 },
        { id: 88807, name: 'Bungo', trait_id: 99907 },
      ])
    )
