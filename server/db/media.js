const connection = require('./connection')

function getMedia (id = 10001, db = connection) {
  return db('media_list')
    .where('user_id', id)
    .then(result => {
      return result
    })
}

module.exports = {
  getMedia
}
