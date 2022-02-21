const request = require('supertest')

const log = require('../logger')
const server = require('../server')
const db = require('../db/volunteers')
const { getMockToken, getAdminToken } = require('./mockToken')
const { decode } = require('../notifications/emailTokens')

jest.mock('../logger')
jest.mock('../db/volunteers')
jest.mock('../notifications/emailTokens')

const mockNonAdminAuthHeader = {
  Authorization: `Bearer ${getMockToken()}`,
}

const mockAuthAdminHeader = {
  Authorization: `Bearer ${getAdminToken()}`,
}

describe('GET /api/v1/volunteer/emailsignup', () => {
  it("responds with 302 and then rediercts to user's garden page", () => {
    const mockToken = 'foobar'
    const mockVolunteer = {
      gardenId: 3,
    }
    db.addVolunteer.mockImplementation(() => Promise.resolve())
    decode.mockImplementation(() => mockVolunteer)
    return request(server)
      .get(`/api/v1/volunteers/emailsignup?token=${mockToken}`)
      .expect(302)
      .then((res) => {
        expect(res.header.location).toBe('/gardens/3')
        return null
      })
  })

  it('responds with 500 and error message during DB error', () => {
    db.addVolunteer.mockImplementation(() =>
      Promise.reject(new Error('mock addVolunteer error'))
    )

    decode.mockImplementation(() => ({ userId: 1 }))
    return request(server)
      .get('/api/v1/volunteers/emailsignup?token=foobar')
      .expect(500)
      .then((res) => {
        expect(log).toHaveBeenCalledWith('mock addVolunteer error')
        expect(res.body.error.title).toBe('Unable to register from email')
        return null
      })
  })
})

describe('POST /api/v1/volunteers', () => {
  it('responds with 401 when no token passed', () => {
    return request(server)
      .post('/api/v1/volunteers')
      .send({ userId: 1, eventId: 1 })
      .then((res) => {
        expect(res.status).toBe(401)
        return null
      })
  })

  it('returns correct response when token is passed', () => {
    db.addVolunteer.mockImplementation(() => Promise.resolve())
    return request(server)
      .post('/api/v1/volunteers')
      .set(mockNonAdminAuthHeader)
      .send({ userId: 1, eventId: 1 })
      .then((res) => {
        expect(res.status).toBe(201)
        return null
      })
  })

  it('responds with 500 and correct error object on DB error', () => {
    db.addVolunteer.mockImplementation(() =>
      Promise.reject(new Error('mock addVolunteer error'))
    )
    return request(server)
      .post('/api/v1/volunteers')
      .set(mockNonAdminAuthHeader)
      .send({ userId: 1, eventId: 1 })
      .expect('Content-Type', /json/)
      .expect(500)
      .then((res) => {
        expect(log).toHaveBeenCalledWith('mock addVolunteer error')
        expect(res.body.error.title).toBe('Unable to register volunteer status')
        return null
      })
  })
})

describe('DELETE /api/v1/volunteers', () => {
  it('responds with 401 when no token is passed', () => {
    return request(server)
      .delete('/api/v1/volunteers')
      .send({ userId: 1, eventId: 1 })
      .then((res) => {
        expect(res.status).toBe(401)
        return null
      })
  })

  it('returns correct response when token is passed', () => {
    db.deleteVolunteer.mockImplementation(() => Promise.resolve())
    return request(server)
      .delete('/api/v1/volunteers')
      .set(mockNonAdminAuthHeader)
      .send({ userId: 1, eventId: 1 })
      .then((res) => {
        expect(res.status).toBe(200)
        return null
      })
  })

  it('responds with 500 and error object during DB error', () => {
    db.deleteVolunteer.mockImplementation(() =>
      Promise.reject(new Error('mock deleteVolunteer error'))
    )
    return request(server)
      .delete('/api/v1/volunteers')
      .set(mockNonAdminAuthHeader)
      .send({ userId: 1, eventId: 1 })
      .expect('Content-Type', /json/)
      .expect(500)
      .then((res) => {
        expect(log).toHaveBeenCalledWith('mock deleteVolunteer error')
        expect(res.body.error.title).toBe('Unable to remove volunteer status')
        return null
      })
  })
})

describe('POST /api/v1/volunteers/extras', () => {
  it('responds with 500 during db error', () => {
    db.addExtraVolunteer.mockImplementation(() => Promise.reject(Error))
    return request(server)
      .post('/api/v1/volunteers/extras')
      .set(mockAuthAdminHeader)
      .send({ eventId: 1, firstName: 'Grace', lastName: 'Malae' })
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.body.error.title).toBe('Unable to add extra volunteer')
        return null
      })
  })

  it('returns correct response when token has passed', () => {
    db.addExtraVolunteer.mockImplementation(() => Promise.resolve([4]))
    return request(server)
      .post('/api/v1/volunteers/extras')
      .set(mockAuthAdminHeader)
      .send({ eventId: 1, firstName: 'Grace', lastName: 'Malae' })
      .then((res) => {
        expect(res.status).toBe(201)
        expect(res.body.extraVolId).toBe(4)
        return null
      })
  })

  it('responds with status 401 when unauthorised token is passed', () => {
    return request(server)
      .post('/api/v1/volunteers/extras')
      .then((response) => {
        expect(response.status).toBe(401)
        return null
      })
  })
})

describe('PATCH /api/v1/volunteers', () => {
  db.setVolunteerAttendance.mockImplementation(() => {
    return Promise.resolve()
  })

  it('Test for unauthorized accesss: no token', () => {
    return request(server)
      .patch('/api/v1/volunteers')
      .then((res) => {
        expect(res.status).toBe(401)
        return null
      })
  })

  it('Test for unauthorized accesss: not admin user', () => {
    return request(server)
      .patch('/api/v1/volunteers')
      .set(mockNonAdminAuthHeader)
      .then((res) => {
        expect(res.status).toBe(403)
        return null
      })
  })

  it('Test for authorized access: admin user', () => {
    return request(server)
      .patch('/api/v1/volunteers')
      .send({ hasAttended: true, userId: 1, eventId: 1 })
      .set(mockAuthAdminHeader)
      .then((res) => {
        expect(res.status).toBe(200)
        return null
      })
  })

  it('Test for 500 response and expect a json error object during db error', () => {
    db.setVolunteerAttendance.mockImplementation(() =>
      Promise.reject(new Error('Db operation error'))
    )
    return request(server)
      .patch('/api/v1/volunteers')
      .set(mockAuthAdminHeader)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.status).toBe(500)
        return null
      })
  })
})
