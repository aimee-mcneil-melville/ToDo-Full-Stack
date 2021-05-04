const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const volunteers = require('./volunteers')

function getTestVolunteers (userId, eventId) {
  if (userId && eventId) { return testDb('eventVolunteers').where('user_id', userId).where('event_id', eventId).select() }

  return testDb('eventVolunteers').select()
}

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('addVolunteer', () => {
  it('adds a volunteer', () => {
    const test = {
      userId: 1,
      eventId: 1
    }
    return volunteers.addVolunteer(test, testDb)
      .then(() => getTestVolunteers())
      .then(info => {
        expect(info[0].user_id).toBe(1)
        expect(info[0].event_id).toBe(1)
        return null
      })
  })
})

describe('deleteVolunteer', () => {
  it('deletes correct volunteer entry', () => {
    const test = {
      userId: 2,
      eventId: 3
    }
    return volunteers.deleteVolunteer(test, testDb)
      .then(() => getTestVolunteers())
      .then((info) => {
        expect(info).toHaveLength(2)
        return null
      })
  })
})

describe('attended test', () => {
  it('should set event to is attend to true', () => {
    expect.assertions(2)
    const testData = {
      isAttended: true,
      userId: 2,
      eventId: 3
    }
    return volunteers.attend(testData, testDb).then(() => {
      return getTestVolunteers(testData.userId, testData.eventId).first()
    }).then(testEvent => {
      expect(testEvent).not.toBeNull()
      expect(testEvent).toEqual(expect.objectContaining({
        event_id: testData.eventId,
        user_id: testData.userId,
        attended: testData ? 1 : 0
      }))
      return null
    }).catch(err => {
      console.log(err.message)
    })
  })
})
