const request = require('supertest')

const server = require('../server')
const db = require('../db/gardens')

jest.mock('../db/gardens')

const mockGardens = [{
  id: 1,
  name: 'Kahu Gardens',
  address: '12 Hukanui Crescent',
  description: 'Kelmarna Gardens is a city farm and ...',
  lat: -36.86011508905973,
  lon: 174.7330772002716,
  url: 'http://www.kelmarnagardens.nz'
}, {
  id: 2,
  name: 'GARDENS ROCK!',
  address: '105 GARDENS ROCK ST',
  description: 'GARDENS ARE THE BEST',
  lat: -36.86011508905973,
  lon: 174.7330772002716,
  url: 'http://www.GARDENSROCK.nz'
}]

const mockUserGarden = {
  id: 2,
  name: 'Gardens 2',
  address: '12 Hukanui Crescent',
  description: 'Kelmarna Gardens is a city farm and ...',
  lat: -36.86011508905973,
  lon: 174.7330772002716,
  url: 'http://www.kelmarnagardens.nz',
  events: [{
    id: 1,
    volunteersNeeded: 8,
    title: 'Weeding Worker Bee',
    datetime: 'Wed, 27 Sep 2020 20:00:00 GMT',
    description: "It's time to get these weeds under control."
  }, {
    id: 1,
    volunteersNeeded: 99,
    title: 'ROCKING THE GARDENS',
    datetime: 'Wed, 26 Sep 2020 20:00:00 GMT',
    description: 'ITS TIME TO ROCK GARDENS.'
  }]
}

describe('GET /api/v1/gardens', () => {
  it('responds with gardens on res body', () => {
    db.getGardens.mockImplementation(() => Promise.resolve(mockGardens))
    return request(server)
      .get('/api/v1/gardens')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.gardens).toHaveLength(2)
        return null
      })
  })

  it('responds with 500 and correct error object on DB error', () => {
    db.getGardens.mockImplementation(() => Promise.reject(
      new Error('mock DB error')
    ))
    return request(server)
      .get('/api/v1/gardens')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        expect(res.body.error).toBe('mock DB error')
        return null
      })
  })
})

describe('GET /api/v1/gardens/:id', () => {
  it('responds with user\'s garden as res body', () => {
    expect.assertions(2)
    db.getUserGarden.mockImplementation((id) => {
      expect(id).toBe(2)
      return Promise.resolve(mockUserGarden)
    })
    return request(server)
      .get('/api/v1/gardens/2')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.events).toHaveLength(2)
        return null
      })
  })

  it('responds with 500 and correct error object on DB error', () => {
    db.getUserGarden.mockImplementation(() => Promise.reject(
      new Error('mock DB error')
    ))
    return request(server)
      .get('/api/v1/gardens/999')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        return expect(res.body.error).toBe('mock DB error')
      })
  })
})
