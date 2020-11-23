const request = require('supertest')

const server = require('../server')

const mockGarden = [{
  'id': 1,
  'name': 'Kahu Gardens',
  'address': '12 Hukanui Crescent',
  'description': 'Kelmarna Gardens is a city farm and ...',
  'lat': -36.86011508905973,
  'lon': 174.7330772002716,
  'url': 'http://www.kelmarnagardens.nz',
  'events': [{
    'id': 1,
    'volunteersNeeded': 8,
    'title': 'Weeding Worker Bee',
    'datetime': 'Wed, 27 Sep 2020 20:00:00 GMT',
    'description': "It's time to get these weeds under control."
  }]
}, {
  'id': 2,
  'name': 'GARDENS ROCK!',
  'address': '105 GARDENS ROCK ST',
  'description': 'GARDENS ARE THE BEST',
  'lat': -36.86011508905973,
  'lon': 174.7330772002716,
  'url': 'http://www.GARDENSROCK.nz',
  'events': [{
    'id': 2,
    'volunteersNeeded': 100,
    'title': 'ROCKING THE GARDENS',
    'datetime': 'Wed, 27 Sep 2020 20:00:00 GMT',
    'description': 'ITS TIME TO ROCK GARDENS.'
  }]
}]

jest.mock('../db', () => {
  return {
    getGardens: function () {
      return Promise.resolve(mockGarden)
    },
    getUserGarden: function (id) {
      return Promise.resolve({
        'id': id,
        'name': 'Gardens 3',
        'address': '12 Hukanui Crescent',
        'description': 'Kelmarna Gardens is a city farm and ...',
        'lat': -36.86011508905973,
        'lon': 174.7330772002716,
        'url': 'http://www.kelmarnagardens.nz',
        'events': [{
          'id': 1,
          'volunteersNeeded': 8,
          'title': 'Weeding Worker Bee',
          'datetime': 'Wed, 27 Sep 2020 20:00:00 GMT',
          'description': "It's time to get these weeds under control."
        }]
      })
    }
  }
})

test('GET / returns the correct number of gardens', () => {
  const expected = 2
  return request(server)
    .get('/api/v1/gardens')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(res => {
      return expect(res.body.gardens).toHaveLength(expected)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('GET /api/v1/gardens/:id returns the correct garden', () => {
  return request(server)
    .get('/api/v1/gardens/2')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(res => {
      return expect(res.body.id).toBe(2)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('GET /api/v1/gardens/:id returns the correct garden based on name', () => {
  const expected = 'Gardens 3'
  return request(server)
    .get('/api/v1/gardens/2')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(res => {
      return expect(res.body.name).toBe(expected)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})
