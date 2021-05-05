const request = require('supertest')

const server = require('../server')
const db = require('../db/gardens')
const log = require('../logger')
const { getMockToken } = require('./mockToken')

jest.mock('../logger')
jest.mock('../db/gardens')

const mockUserGarden = {
  id: 2,
  name: 'Gardens 2',
  address: '12 Hukanui Crescent',
  description: 'Kelmarna Gardens is a city farm and ...',
  lat: -36.86011508905973,
  lon: 174.7330772002716,
  url: 'http://www.kelmarnagardens.nz',
  events: [
    {
      id: 1,
      volunteersNeeded: 8,
      title: 'Weeding Worker Bee',
      date: 'Wed, 27 Sep 2020 20:00:00 GMT',
      description: "It's time to get these weeds under control.",
      volunteers: [
        {
          username: 'Sam',
          userId: 3
        }, {
          username: 'Steve',
          userId: 4
        }
      ]
    }, {
      id: 2,
      volunteersNeeded: 19,
      title: 'Rocking the Garden',
      date: 'Wed, 26 Sep 2020 20:00:00 GMT',
      description: "It's time to rock this garden!",
      volunteers: [
        {
          username: 'Sam',
          userId: 3
        }, {
          username: 'Steve',
          userId: 4
        }
      ]
    }]
}

const mockAdminAuthHeader = {
  Authorization: `Bearer ${getMockToken(1, 'admin', 'admin@test.co', true)}`
}

const mockNonAdminAuthHeader = {
  Authorization: `Bearer ${getMockToken(3, 'sam', 'sam@test.co', false)}`
}

describe('GET /api/v1/gardens', () => {
  it('responds with gardens on res body', () => {
    db.getGardens.mockImplementation(() => Promise.resolve(
      [{
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
    ))
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
      new Error('mock getGardens error')
    ))
    return request(server)
      .get('/api/v1/gardens')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        expect(log).toHaveBeenCalledWith('mock getGardens error')
        expect(res.body.error.title).toBe('Unable to retrieve gardens')
        return null
      })
  })
})

describe('GET /api/v1/gardens/:id', () => {
  it("responds with user's garden when token is provided", () => {
    expect.assertions(2)
    db.getGardenById.mockImplementation((id) => {
      expect(id).toBe(2)
      return Promise.resolve(mockUserGarden)
    })
    return request(server)
      .get('/api/v1/gardens/2')
      .set(mockNonAdminAuthHeader)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.events).toHaveLength(2)
        return null
      })
  })

  it('responds with garden when token is not provided', () => {
    expect.assertions(2)
    db.getGardenById.mockImplementation((id) => {
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
    db.getGardenById.mockImplementation(() => Promise.reject(
      new Error('mock getGardenById error')
    ))
    return request(server)
      .get('/api/v1/gardens/999')
      .set(mockAdminAuthHeader)
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        expect(log).toHaveBeenCalledWith('mock getGardenById error')
        expect(res.body.error.title).toBe('Unable to retrieve garden')
        return null
      })
  })

  it('returns volunteers array if user is admin', () => {
    const expected = [
      {
        username: 'Sam',
        userId: 3
      }, {
        username: 'Steve',
        userId: 4
      }
    ]

    db.getGardenById.mockImplementation((id) => {
      expect(id).toBe(2)
      return Promise.resolve(mockUserGarden)
    })

    return request(server)
      .get('/api/v1/gardens/2')
      .set(mockAdminAuthHeader)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.events[1].volunteers).toMatchObject(expected)
        return null
      })
  })

  it('includes isVolunteer in response if user is not admin', () => {
    db.getGardenById.mockImplementation((id) => {
      expect(id).toBe(2)
      return Promise.resolve(mockUserGarden)
    })
    return request(server)
      .get('/api/v1/gardens/2')
      .set(mockNonAdminAuthHeader)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.events[0]).toHaveProperty('isVolunteer')
        return null
      })
  })
})
