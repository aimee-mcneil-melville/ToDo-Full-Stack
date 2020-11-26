const request = require('supertest')

const server = require('../server')
const db = require('../db/event')

jest.mock('../db/event')

const mockEvents = [{
  id: 1,
  garden_id: 1,
  title: 'Poo poo',
  date: 'Wed, 27 Sep 2020 20:00:00 GMT',
  description: 'Its time to get these weeds under control.',
  volunteers_needed: 8
},
{
  id: 2,
  garden_id: 1,
  title: 'Pee pee',
  date: 'Wed, 28 Sep 2020 20:00:00 GMT',
  description: 'Help get out the lovely corns in the ground!.',
  volunteers_needed: 4
}
]

describe('GET /api/v1/events', () => {
  it('responds with events on res body', () => {
    db.getEvents.mockImplementation(() => Promise.resolve(mockEvents))
    return request(server)
      .get('/api/v1/events')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toHaveLength(2)
        return null
      })
  })

  it('responds with 500 and correct error object on DB error', () => {
    db.getEvents.mockImplementation(() => Promise.reject(
      new Error('mock DB error')
    ))
    return request(server)
      .get('/api/v1/events')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        expect(res.body.error).toBe('mock DB error')
        return null
      })
  })
})

describe('POST /api/v1/events', () => {
  it('')
})
