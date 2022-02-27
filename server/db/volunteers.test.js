const knex = require('knex')
const config = require('./knexfile').test
const volunteers = require('./volunteers')

const testDb = knex(config)

// Prevent Jest from timing out (5s often isn't enough)
jest.setTimeout(10000)

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

function getTestVolunteers(userId, eventId) {
  if (userId && eventId) {
    return testDb('event_volunteers')
      .where({ user_id: userId, event_id: eventId })
      .select()
  }

  return testDb('event_volunteers').select()
}

describe('addVolunteer', () => {
  it('adds a volunteer', () => {
    const test = {
      userId: 49,
      eventId: 49,
    }
    return volunteers
      .addVolunteer(test, testDb)
      .then(() => getTestVolunteers(test.userId, test.userId))
      .then((eventVolunteers) => {
        expect(eventVolunteers[0].user_id).toBe(49)
        expect(eventVolunteers[0].event_id).toBe(49)
        return null
      })
  })
})

describe('deleteVolunteer', () => {
  it('deletes correct volunteer entry', () => {
    const test = {
      userId: 256,
      eventId: 256,
    }
    return volunteers
      .deleteVolunteer(test, testDb)
      .then(() => getTestVolunteers(test.userId, test.eventId))
      .then((info) => {
        expect(info).toHaveLength(0)
        return null
      })
  })
})

describe('markVolunteerAttendance', () => {
  it('marks a volunteer as having attended an event', () => {
    const testData = {
      hasAttended: true,
      userId: 2,
      eventId: 3,
    }
    return volunteers
      .setVolunteerAttendance(testData, testDb)
      .then(() => {
        return getTestVolunteers(testData.userId, testData.eventId).first()
      })
      .then((firstTestVolunteer) => {
        expect(firstTestVolunteer).toEqual(
          expect.objectContaining({
            event_id: testData.eventId,
            user_id: testData.userId,
            attended: testData.hasAttended ? 1 : 0,
          })
        )
        return null
      })
  })
})

describe('addExraVolunteer test', () => {
  it('should add extra volunteers that are not registered', () => {
    const rockUp = {
      eventId: 1,
      firstName: 'Erin',
      lastName: 'Abernethy',
    }
    return volunteers
      .addExtraVolunteer(rockUp, testDb)
      .then(() => testDb('extra_volunteers').select())
      .then(([rockUp]) => {
        expect(rockUp.event_id).toBe(1)
        expect(rockUp.first_name).toBe('Erin')
        expect(rockUp.last_name).toBe('Abernethy')
        return null
      })
  })
})
