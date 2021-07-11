exports.seed = (knex) => {
  return knex('gardens').del()
    .then(() => {
      return knex('gardens').insert([
        {
          id: 1,
          name: 'Kelmarna Gardens',
          address: '12 Hukanui Crescent',
          description: 'Kelmarna Gardens is a city farm and organic community garden, situated on 4.5 acres of council land in Ponsonby, close to the heart of Auckland City.',
          lat: -36.85137418793577,
          lon: 174.73319270646485,
          url: 'http://www.kelmarnagardens.nz/'
        },
        {
          id: 2,
          name: 'Kingsland Community Orchard',
          address: 'Bond Street, Kingsland',
          description: 'A secluded edible oasis in the heart of Kingsland, Auckland. Kingsland Community Orchard; an edible urban garden and orchard located in the heart of Kingsland, Auckland.',
          lat: -36.86983345249252,
          lon: 174.74701843955708,
          url: 'https://www.facebook.com/KCOnz'
        },
        {
          id: 3,
          name: 'Devonport Community Garden',
          address: '33 Vauxhall Road, Devonport, Auckland 0624',
          description: 'Devonport Community Garden is a small garden with BIG plans',
          lat: -36.82514374209753,
          lon: 174.80311208557973,
          url: 'https://sites.google.com/site/communitygardendevonportnz/home'
        }
      ])
    })
}

// More can be found at https://www.google.com/maps/d/viewer?mid=1yK_8in6Jcvm8ibE69vwU-BTnFxI&ie=UTF8&hl=en&oe=UTF8&msa=0&ll=-36.86011508905973%2C174.7330772002716&spn=5.013814%2C2.808402&source=embed&z=13
