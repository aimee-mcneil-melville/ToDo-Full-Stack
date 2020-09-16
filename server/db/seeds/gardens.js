exports.seed = (knex) => {
  return knex('gardens').del()
    .then(() => {
      return knex('gardens').insert([
        {
          id: 1,
          name: 'Kelmarna Gardens',
          address: '12 Hukanui Crescent',
          lat: -36.86011508905973,
          lon: 174.7330772002716,
          url: 'http://www.kelmarnagardens.nz/'
        },
        {
          id: 2,
          name: 'Kingsland Community Orchard',
          address: 'Bond Street, Kingsland',
          lat: -36.86011508905973,
          lon: 174.7330772002716,
          url: 'https://www.facebook.com/KCOnz'
        },
        {
          id: 3,
          name: 'Devonport Community Garden',
          address: '10 Morris Avenue, Devonport, 7310',
          lat: -36.86011508905973,
          lon: 174.7330772002716,
          url: 'https://www.devonport.tas.gov.au/live/your-community/community-services/community-houses/devonport-community-garden'
        }
      ])
    })
}

// More can be found at https://www.google.com/maps/d/viewer?mid=1yK_8in6Jcvm8ibE69vwU-BTnFxI&ie=UTF8&hl=en&oe=UTF8&msa=0&ll=-36.86011508905973%2C174.7330772002716&spn=5.013814%2C2.808402&source=embed&z=13
