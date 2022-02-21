const request = require('supertest')

const server = require('../server')
const db = require('../db/event')
const {
  sendEventNotifications,
} = require('../notifications/notificationHelper')
const log = require('../logger')
const { getAdminToken } = require('./mockToken')

jest.mock('../logger')
jest.mock('../db/event')
jest.mock('../notifications/notificationHelper')

// mock events for testing guest users
const mockEvent = {
  id: 2,
  gardenId: 1,
  gardenName: 'Kelmarna Gardens',
  gardenAddress: '12 Hukanui Crescent',
  volunteersNeeded: 8,
  title: 'Weeding worker Bee',
  date: '2020-08-27',
  description: 'Its time to get these weeds under control.',
  status: 'Active',
  volunteers: [
    {
      userId: 3,
      firstName: 'Johnny',
      lastName: 'Dawg',
    },
  ],
  extraVolunteers: [
    {
      eventId: 3,
      firstName: 'Din',
      lastName: 'Don',
    },
  ],
}

const testAuthAdminHeader = {
  Authorization: `Bearer ${getAdminToken()}`,
}

describe('GET /api/v1/events/:id', () => {
  it('responds only with event details', () => {
    db.getEventById.mockImplementation((id) => {
      expect(id).toBe(2)
      return Promise.resolve(mockEvent)
    })
    return request(server)
      .get('/api/v1/events/2')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.gardenId).toBe(1)
        expect(res.body.gardenName).toBe('Kelmarna Gardens')
        expect(res.body.gardenAddress).toBe('12 Hukanui Crescent')
        expect(res.body.volunteersNeeded).toBe(8)
        expect(res.body.title).toBe('Weeding worker Bee')
        expect(res.body.date).toBe('2020-08-27')
        expect(res.body.description).toBe(
          'Its time to get these weeds under control.'
        )
        expect(res.body.status).toBe('Active')
        expect(res.body.volunteers).toHaveLength(1)
        expect(res.body.volunteers[0].lastName).toBe('Dawg')
        expect(res.body.extraVolunteers).toHaveLength(1)
        expect(res.body.extraVolunteers[0].lastName).toBe('Don')
        return null
      })
  })

  it('responds with status 500 and an error during a DB error', () => {
    db.getEventById.mockImplementation(() =>
      Promise.reject(new Error('mock getEventById error'))
    )
    return request(server)
      .get('/api/v1/events/999')
      .expect('Content-Type', /json/)
      .expect(500)
      .then((res) => {
        expect(log).toHaveBeenCalledWith('mock getEventById error')
        expect(res.body.error.title).toBe('Unable to retrieve event')
        return null
      })
  })
})

describe('POST /api/v1/events', () => {
  it('responds with status 401 when no token is passed', () => {
    return request(server)
      .post('/api/v1/events')
      .then((res) => {
        expect(res.status).toBe(401)
        return null
      })
  })

  it('responds with the correct event', () => {
    expect.assertions(6)
    db.addEvent.mockImplementation((newEvent) => {
      expect(newEvent.description).toMatch('cool event')
      expect(newEvent.date).toMatch('12-31')
      expect(newEvent.volunteersNeeded).toBe(500)
      expect(newEvent.title).toMatch('Gardening')
      expect(newEvent.gardenId).toBe(3)
      return Promise.resolve({
        id: 4,
        gardenId: 3,
        title: 'Gardening Event',
        date: '2020-12-31',
        volunteersNeeded: 500,
        description: 'supremely cool event',
      })
    })
    sendEventNotifications.mockImplementation(() => Promise.resolve())
    return request(server)
      .post('/api/v1/events')
      .set(testAuthAdminHeader)
      .send({
        gardenId: 3,
        title: 'Gardening Event',
        date: '2020-12-31',
        volunteersNeeded: 500,
        description: 'supremely cool event',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body.title).toBe('Gardening Event')
        return null
      })
  })

  it('responds with status 500 and an error during a DB error', () => {
    db.addEvent.mockImplementation(() =>
      Promise.reject(new Error('mock addEvent error'))
    )
    return request(server)
      .post('/api/v1/events')
      .set(testAuthAdminHeader)
      .expect('Content-Type', /json/)
      .expect(500)
      .then((res) => {
        expect(log).toHaveBeenCalledWith('mock addEvent error')
        expect(res.body.error.title).toBe('Unable to add event')
        return null
      })
  })
})

describe('PATCH /api/v1/events/:id/cancel', () => {
  it('responds with 401 when no token passed', () => {
    return request(server)
      .patch('/api/v1/events/1')
      .then(({ status }) => {
        expect(status).toBe(401)
        return null
      })
  })

  it('should successfully cancel the event', () => {
    db.cancelEvent.mockImplementation((cancelledEventId) => {
      expect(cancelledEventId).toBe(2)
      return Promise.resolve({
        id: 2,
        status: 'Cancelled',
      })
    })
    return request(server)
      .patch('/api/v1/events/2/cancel')
      .set(testAuthAdminHeader)
      .send({ id: 2 })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.status).toBe('Cancelled')
        return null
      })
  })
})

describe('PATCH /api/v1/events/:id', () => {
  it('responds with 401 when no token passed', () => {
    return request(server)
      .patch('/api/v1/events/2')
      .then(({ status }) => {
        expect(status).toBe(401)
        return null
      })
  })

  it('responds with the correct event given its id', () => {
    expect.assertions(6)
    db.updateEvent.mockImplementation((updatedEvent) => {
      expect(updatedEvent.description).toMatch('best event')
      expect(updatedEvent.id).toBe(2)
      expect(updatedEvent.title).toBe('cooler event')
      expect(updatedEvent.volunteersNeeded).toBe(1000)
      expect(updatedEvent.date).toBe('2021-01-01')
      return Promise.resolve({
        id: 2,
        title: 'cooler event',
        date: '2021-01-01',
        volunteersNeeded: 1000,
        description: 'the best event ever',
      })
    })
    return request(server)
      .patch('/api/v1/events/2')
      .set(testAuthAdminHeader)
      .send({
        id: 2,
        title: 'cooler event',
        date: '2021-01-01',
        volunteersNeeded: 1000,
        description: 'the best event ever',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.title).toBe('cooler event')
        return null
      })
  })

  it('responds with 500 and correct error object on DB error', () => {
    db.updateEvent.mockImplementation(() =>
      Promise.reject(new Error('mock updateEvent error'))
    )
    return request(server)
      .patch('/api/v1/events/999')
      .set(testAuthAdminHeader)
      .expect('Content-Type', /json/)
      .expect(500)
      .then((res) => {
        expect(log).toHaveBeenCalledWith('mock updateEvent error')
        expect(res.body.error.title).toBe('Unable to update event')
        return null
      })
  })
})
