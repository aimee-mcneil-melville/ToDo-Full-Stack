const connection = require('./connection')

module.exports = {
  getGardens
}

function getGardens (db = connection) {
  return db('gardens').select()
    .catch(err => {
      console.error(err)
      throw err
    })
}
