const { sendEventNotifications } = require('./notificationHelper')
const { sendNotification } = require('./notifications')
const dbUser = require('../db/users')

jest.mock('../db/users')
jest.mock('./notifications')

describe('send each user a notification', () => {
  it('takes the new event and sends notifications to users with gardenid', () => {
    expect.assertions(2)
    dbUser.getUserDetailsByGarden.mockImplementation((gardenId) => {
      expect(gardenId).toBe(1)
      return Promise.resolve([
        {
          id: 4,
          gardenId: 1,
          firstName: 'Admin',
          isAdmin: true,
          email: 'admin@outlook.com',
        },
        {
          id: 5,
          gardenId: 1,
          firstName: 'Otheruser',
          isAdmin: false,
          email: 'user@outlook.com',
        },
      ])
    })

    const event = {
      id: 2,
      gardenId: 1,
      title: 'test event name',
      date: '01/12/2021',
      description: 'This is a test',
      volunteersNeeded: 1,
    }

    return sendEventNotifications(event).then(() => {
      expect(sendNotification).toHaveBeenCalledTimes(2)
      return null
    })
  })
})
