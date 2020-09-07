const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

function listProducts (db = connection) {
  return db('products')
    .select()
}

function addProduct (product, db = connection) {
  const { name, description, country } = product
  const newProduct = { name, description, country }
  return db('products')
    .insert(newProduct)
}

function editProduct (id, product, db = connection) {
  const { name, description, country } = product
  const editedProduct = { name, description, country }
  return db('products')
    .update(editedProduct).where('id', id)
}

function removeProduct (id, db = connection) {
  return db('products')
    .del().where('id', id)
}

module.exports = {
  listProducts,
  addProduct,
  editProduct,
  removeProduct
}
