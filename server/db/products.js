const connection = require('./connection')

module.exports = {
  listProducts
}

function listProducts (db = connection) {
  return db('products')
    .select()
}
