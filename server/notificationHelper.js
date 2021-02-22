const dbUser = require('./db/users')
const { sendNotification } = require('./notifications')

function sendEventNotifications (event) {
  const gardenId = event.gardenId
  dbUser.getUserDetailsByGarden(gardenId)
    .then(users => sendUserNotifications(users, event))
    .catch(err => console.error(err))
}

function sendUserNotifications (users, event) {
  users.forEach(user => sendNotification(user, event))
}

module.exports = {
  sendEventNotifications,
  sendUserNotifications
}
