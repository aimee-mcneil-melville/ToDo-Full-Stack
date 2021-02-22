const dbUser = require('./db/users')
const notificationFile = require('./notifications')

function usersByGarden (event) {
  const newEvent = event
  const gardenId = event.gardenId
  dbUser.getUserDetailsByGarden(gardenId)
    .then(result => mapOverUsers(result, newEvent))
    .catch(result => console.log(result))
}

function mapOverUsers (userData, eventData) {
  const details = eventData
  userData.map(result => notificationFile.sendNotification(result, details))
}

module.exports = {
  usersByGarden
}
