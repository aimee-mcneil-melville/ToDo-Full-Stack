const dbUser = require('./db/users')
const notificationFile = require('./notifications')

function usersByGarden (event) {
  const newEvent = event
  const gardenId = event.gardenId
  dbUser.getUserEmailsByGarden(gardenId)
    .then(result => mapOverUsers(result, newEvent))
    .catch(result => console.log(result))
}

function mapOverUsers (userData, eventData) {
  const details = eventData
  console.log(userData)
  userData.map(result => notificationFile.sendNotification(result, details))
}

module.exports = {
  usersByGarden
}
