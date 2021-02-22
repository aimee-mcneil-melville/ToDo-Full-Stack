const { sendUserNotifications } = require('./notificationHelper')
const { sendNotification } = require('./notifications')

describe('send each user a notification', () => {
  it('runs sendNotification 1 time', () => {
    const event = {
      id: 1,
      gardenId: 1,
      title: 'asdf',
      date: '01/12/2021',
      description: 'This is a test',
      volunteersNeeded: 1
    }
    const user = [{
      id: 1,
      garden_id: 1,
      username: 'admin',
      is_admin: true,
      email: 'admin@outlook.com'
    }]
    return sendUserNotifications(user, event)
      .then(() => {
        expect(sendNotification).toHaveBeenCalledTimes(1)
        return null
      })
  })
})
