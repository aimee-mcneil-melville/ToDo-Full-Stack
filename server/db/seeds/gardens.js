exports.seed = (knex) => {
  return knex('gardens').del()
    .then(() => {
      return knex('gardens').insert([
        {
          id: 1,
          name: 'Kelmarna Gardens',
          address: '12 Hukanui Crescent',
          description: 'Kelmarna Gardens is a city farm and organic community garden, situated on 4.5 acres of council land in Ponsonby, close to the heart of Auckland City.',
          lat: -36.8508867,
          lon: 174.7329663,
          url: 'http://www.kelmarnagardens.nz/'
        },
        {
          id: 2,
          name: 'Kingsland Community Orchard',
          address: 'Bond Street, Kingsland',
          description: 'A secluded edible oasis in the heart of Kingsland, Auckland. Kingsland Community Orchard; an edible urban garden and orchard located in the heart of Kingsland, Auckland.',
          lat: -36.869990,
          lon: 174.746720,
          url: 'https://www.facebook.com/KCOnz'
        },
        {
          id: 3,
          name: 'Devonport Community Garden',
          address: '10 Morris Avenue, Devonport, 7310',
          description: 'The Devonport Community Garden is an initiative of Devonport Community House through consultation with the public and was initially sponsored by Housing Tas. With support from the Devonport City Council, local schools, businesses and neighbours, the garden provides an ideal place for people to meet, learn and develop their skills.',
          lat: -36.82313981954446,
          lon: 174.79848596769176,
          url: 'https://www.devonport.tas.gov.au/live/your-community/community-services/community-houses/devonport-community-garden'
        }
      ])
    })
}

// More can be found at https://www.google.com/maps/d/viewer?mid=1yK_8in6Jcvm8ibE69vwU-BTnFxI&ie=UTF8&hl=en&oe=UTF8&msa=0&ll=-36.86011508905973%2C174.7330772002716&spn=5.013814%2C2.808402&source=embed&z=13
