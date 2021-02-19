const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const volunteers = require('./volunteers')

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
      .then(() => volunteers.getVolunteer(testDb))
      .then(info => {
        expect(info[0].user_id).toBe(1)
        expect(info[0].event_id).toBe(1)
        return null
      })
  })
})

describe('deleteVolunteer', () => {
  it('deletes correct user', () => {
    const test = {
      userId: 2,
      eventId: 2
    }
    return volunteers.deleteVolunteer(test, testDb)
      .then(() => volunteers.getVolunteer(testDb))
      .then((info) => {
        expect(info).toHaveLength(2)
        return null
      })
  })
})
