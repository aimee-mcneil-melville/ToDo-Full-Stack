// this file is created separately from the gardens.test.js
// because it fails due to timout error.
// most likely its because of mocking the auth.js file
// I had to sepaarate it so that all gardens test work

const request = require('supertest')

const server = require('../server')
const db = require('../db/gardens')
const log = require('../logger')
const { getAdminToken } = require('./mockToken')

jest.mock('../logger')
jest.mock('../db/gardens')
jest.mock('../db/users')

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
          userId: 3,
        },
        {
          username: 'Steve',
          userId: 4,
        },
      ],
    },
    {
      id: 2,
      volunteersNeeded: 19,
      title: 'Rocking the Garden',
      date: 'Wed, 26 Sep 2020 20:00:00 GMT',
      description: "It's time to rock this garden!",
      volunteers: [
        {
          username: 'Sam',
          userId: 3,
        },
        {
          username: 'Steve',
          userId: 4,
        },
      ],
    },
  ],
}

const testAuthAdminHeader = {
  Authorization: `Bearer ${getAdminToken()}`,
}

describe('POST /api/v1/gardens', () => {
  it('responds with status 401 when no token is passed', () => {
    return request(server)
      .post('/api/v1/gardens')
      .then((res) => {
        expect(res.status).toBe(401)
        return null
      })
  })

  it('responds with the correct garden', () => {
    db.addGarden.mockImplementation((newGarden) => {
      expect(newGarden.id).toBe(2)
      expect(newGarden.name).toMatch('Gardens 2')
      expect(newGarden.description).toMatch(
        'Kelmarna Gardens is a city farm and ...'
      )
      expect(newGarden.address).toMatch('12 Hukanui Crescent')
      return Promise.resolve(mockUserGarden)
    })
  })

  it('responds with status 500 and an error during a DB error', () => {
    db.addGarden.mockImplementation(() =>
      Promise.reject(new Error('mock addGarden error'))
    )
    return request(server)
      .post('/api/v1/gardens')
      .set(testAuthAdminHeader)
      .expect('Content-Type', /json/)
      .expect(500)
      .then((res) => {
        expect(log).toHaveBeenCalledWith('mock addGarden error')
        expect(res.body.error.title).toBe('Unable to add garden')
        return null
      })
  })
})
