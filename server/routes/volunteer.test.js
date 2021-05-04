const request = require('supertest')

const log = require('../logger')
const server = require('../server')
const db = require('../db/volunteers')
const { getMockToken } = require('./mockToken')

jest.mock('../logger')
jest.mock('../db/volunteers')

const mockNonAdminAuthHeader = {
  Authorization: `Bearer ${getMockToken(1, 'testuser', 'testuser@test.co', false)}`
}

const testAuthAdminHeader = {
  Authorization: `Bearer ${getMockToken(3, 'testAdmin', 'testadmin@test.co', true)}`
}

describe('POST /api/v1/volunteer', () => {
  it('responds with 401 when no token passed', () => {
    return request(server)
      .post('/api/v1/volunteer')
      .send({ userId: 1, eventId: 1 })
      .then(res => {
        expect(res.status).toBe(401)
        return null
      })
  })

  it('returns correct response when token is passed', () => {
    db.addVolunteer.mockImplementation(() => Promise.resolve())
    return request(server)
      .post('/api/v1/volunteer')
      .set(mockNonAdminAuthHeader)
      .send({ userId: 1, eventId: 1 })
      .then(res => {
        expect(res.status).toBe(201)
        return null
      })
  })

  it('responds with 500 and correct error object on DB error', () => {
    db.addVolunteer.mockImplementation(() => Promise.reject(
      new Error('mock addVolunteer error')
    ))
    return request(server)
      .post('/api/v1/volunteer')
      .set(mockNonAdminAuthHeader)
      .send({ userId: 1, eventId: 1 })
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        expect(log).toHaveBeenCalledWith('mock addVolunteer error')
        expect(res.body.error.title).toBe('Unable to register volunteer status')
        return null
      })
  })
})

describe('DELETE /api/v1/volunteer', () => {
  it('responds with 401 when no token is passed', () => {
    return request(server)
      .delete('/api/v1/volunteer')
      .send({ userId: 1, eventId: 1 })
      .then(res => {
        expect(res.status).toBe(401)
        return null
      })
  })

  it('returns correct response when token is passed', () => {
    db.deleteVolunteer.mockImplementation(() => Promise.resolve())
    return request(server)
      .delete('/api/v1/volunteer')
      .set(mockNonAdminAuthHeader)
      .send({ userId: 1, eventId: 1 })
      .then(res => {
        expect(res.status).toBe(200)
        return null
      })
  })

  it('responds with 500 and error object during DB error', () => {
    db.deleteVolunteer.mockImplementation(() => Promise.reject(
      new Error('mock deleteVolunteer error')
    ))
    return request(server)
      .delete('/api/v1/volunteer')
      .set(mockNonAdminAuthHeader)
      .send({ userId: 1, eventId: 1 })
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        expect(log).toHaveBeenCalledWith('mock deleteVolunteer error')
        expect(res.body.error.title).toBe('Unable to remove volunteer status')
        return null
      })
  })
})

describe('POST /api/v1/volunteer/extras', () => {
  it('responds with 500 during db error', () => {
    db.addExtraVolunteer.mockImplementation(() => Promise.reject(Error))
    return request(server)
      .post('/api/v1/volunteer/extras')
      .set(testAuthAdminHeader)
      .send({ eventId: 1, firstName: 'Grace', lastName: 'Malae' })
      .then(res => {
        expect(res.status).toBe(500)
        expect(res.body.error.title).toBe('Unable to add extra volunteer')
        return null
      })
  })

  it('returns correct response when token has passed', () => {
    db.addExtraVolunteer.mockImplementation(() => Promise.resolve(201))
    return request(server)
      .post('/api/v1/volunteer/extras')
      .set(testAuthAdminHeader)
      .send({ eventId: 1, firstName: 'Grace', lastName: 'Malae' })
      .then(res => {
        expect(res.status).toBe(201)
        return null
      })
  })

  it('responds with status 401 when unauthorised token is passed', () => {
    return request(server)
      .post('/api/v1/volunteer/extras')
      .then(response => {
        expect(response.status).toBe(401)
        return null
      })
  })
})

describe('PATCH /api/v1/volunteer', () => {
  db.setVolunteerAttendance.mockImplementation(() => {
    return Promise.resolve()
  })

  it('Test for unauthorized accesss: no token', () => {
    return request(server)
      .patch('/api/v1/volunteer')
      .then(res => {
        expect(res.status).toEqual(401)
        return null
      })
  })

  it('Test for unauthorized accesss: not admin user', () => {
    const token = getMockToken(1, 'user', 'usertest@test.co', false)

    return request(server)
      .patch('/api/v1/volunteer')
      .set({ Authorization: `Bearer ${token}` })
      .then(res => {
        expect(res.status).toEqual(401)
        return null
      })
  })

  it('Test for authorized access: admin user', () => {
    const token = getMockToken(1, 'admin', 'admin@test.co', true)
    return request(server)
      .patch('/api/v1/volunteer')
      .set({ Authorization: `Bearer ${token}` })
      .then(res => {
        expect(res.status).toEqual(200)
        return null
      })
  })

  it('Test for 500 response and expect a json error object during db error', () => {
    db.setVolunteerAttendance.mockImplementation(() => Promise.reject(new Error('Db operation error')))
    const token = getMockToken(1, 'admin', 'admin@test.co', true)
    return request(server)
      .patch('/api/v1/volunteer')
      .set({ Authorization: `Bearer ${token}` })
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.status).toEqual(500)
        return null
      })
  })
})
