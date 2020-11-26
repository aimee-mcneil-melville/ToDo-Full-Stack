const request = require('supertest')

const server = require('../server')
const db = require('../db/event')

jest.mock('../db/event')

const mockEvents = [{
  id: 1,
  gardenId: 1,
  title: 'Poo poo',
  date: 'Wed, 27 Sep 2020 20:00:00 GMT',
  description: 'Its time to get these weeds under control.',
  volunteersNeeded: 8
},
{
  id: 2,
  gardenId: 1,
  title: 'Pee pee',
  date: 'Wed, 28 Sep 2020 20:00:00 GMT',
  description: 'Help get out the lovely corns in the ground!.',
  volunteersNeeded: 4
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
  it('respond with the event on res body', () => {
    expect.assertions(2)
    db.addEvent.mockImplementation((newEvent) => {
      expect(newEvent.description).toBe('test')
      return Promise.resolve({
        gardenId: 3,
        title: 'Crystal isCool',
        dateTime: 'test',
        volunteersNeeded: 'test',
        description: 'test'
      })
    })
    return request(server)
      .post('/api/v1/events')
      .send({
        title: 'Crystal isCool',
        dateTime: 'test',
        volunteersNeeded: 'test',
        description: 'test'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        expect(res.body.title).toBe('Crystal isCool')
        return null
      })
  })
})


