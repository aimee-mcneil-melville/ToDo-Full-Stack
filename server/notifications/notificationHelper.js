const dbUser = require('../db/users')
const { sendNotification } = require('./notifications')

function sendEventNotifications(event) {
  const gardenId = event.gardenId
  return dbUser
    .getUserDetailsByGarden(gardenId)
    .then((users) => sendUserNotifications(users, event))
}

function sendUserNotifications(users, event) {
  users.forEach((user) => sendNotification(user, event))
  return null
}

module.exports = {
  sendEventNotifications,
}
