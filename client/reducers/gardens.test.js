import gardensReducer from './gardens'

test('returns new gardens object on "RECEIVE_GARDENS"', () => {
  const oldState = {
    user: {
      username: '',
      isAdmin: false,
      gardenId: null,
      latitude: null,
      longitude: null
    },
    gardens: []
  }

  const action = {
    type: 'RECEIVE_GARDENS',
    gardens: [
      { id: 1, name: 'Kelmarna Gardens', address: '12 Hukanui Crescent', description: 'Kelmarna Gardens is a city farm and organic community garden, situated on 4.5 acres of council land in Ponsonby, close to the heart of Auckland City.', lat: -36.86011508905973, lon: 174.7330772002716, url: 'http://www.kelmarnagardens.nz/' },
      { id: 2, name: 'Kingsland Community Orchard', address: 'Bond Street, Kingsland', description: 'A secluded edible oasis in the heart of Kingsland, Auckland. Kingsland Community Orchard; an edible urban garden and orchard located in the heart of Kingsland, Auckland.', lat: -36.86011508905973, lon: 174.7330772002716, url: 'https://www.facebook.com/KCOnz' },
      { id: 3, name: 'Devonport Community Garden', address: '10 Morris Avenue, Devonport, 7310', description: 'The Devonport Community Garden is an initiative of Devonport Community House through consultation with the public and was initially sponsored by Housing Tas. With support from the Devonport City Council, local schools, businesses and neighbours, the garden provides an ideal place for people to meet, learn and develop their skills.', lat: -36.86011508905973, lon: 174.7330772002716, url: 'https://www.devonport.tas.gov.au/live/your-community/community-services/community-houses/devonport-community-garden' }
    ]
  }
  const newState = gardensReducer(oldState, action)
  expect(newState).toHaveLength(3)
  expect(newState[1].name).toBe('Kingsland Community Orchard')
  expect(newState).not.toBe(oldState)
})

test('returns old state on unknown action type', () => {
  const oldState = {
    user: {
      username: '',
      isAdmin: false,
      gardenId: null,
      latitude: null,
      longitude: null
    },
    gardens: []
  }
  const action = {
    type: 'RANDOM_OTHER_ACTION'
  }
  const newState = gardensReducer(oldState, action)
  expect(newState).toBe(oldState)
})
