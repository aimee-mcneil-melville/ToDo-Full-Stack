const { sendEventNotifications } = require('./notificationHelper')
const { sendNotification } = require('./notifications')
const dbUser = require('./db/users')
jest.mock('./db/users')
jest.mock('./notifications')

describe('send each user a notification', () => {
  it('runs sendNotification 1 time', () => {
    expect.assertions(4)
    dbUser.getUserDetailsByGarden.mockImplementation((gardenId) => {
      expect(gardenId).toBe(1)
      return Promise.resolve([{
        id: 4,
        gardenId: 1,
        username: 'admin',
        isAdmin: true,
        email: 'admin@outlook.com'
      }])
    })
    sendNotification.mockImplementation((user, event) => {
      expect(user.id).toBe(4)
      expect(event.title).toBe('test event name')
      expect(event.id).toBe(2)
    })

    const event = {
      id: 2,
      gardenId: 1,
      title: 'test event name',
      date: '01/12/2021',
      description: 'This is a test',
      volunteersNeeded: 1
    }

    sendEventNotifications(event)
  })
})
