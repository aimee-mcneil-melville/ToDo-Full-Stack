const connection = require('./connection')

module.exports = {
  getFruits,
  addFruit,
  updateFruit,
  deleteFruit,
}

function sort(fruitArray) {
  const allFruits = [...fruitArray]
  allFruits.sort((a, b) => a.id - b.id)
  return allFruits
}

async function getFruits(db = connection) {
  return db('fruits')
    .select(
      'id',
      'name',
      'average_grams_each as averageGramsEach',
      'added_by_user as addedByUser'
    )
    .then(sort)
}

async function addFruit(fruit, db = connection) {
  return db('fruits')
    .insert(fruit)
    .then(() => db)
    .then(getFruits)
    .then(sort)
}

async function updateFruit(newFruit, user, db = connection) {
  return db('fruits')
    .where('id', newFruit.id)
    .first()
    .then((fruit) => authorizeUpdate(fruit, user))
    .then(() => {
      return db('fruits').where('id', newFruit.id).update(newFruit)
    })
    .then(() => db)
    .then(getFruits)
    .then(sort)
}

async function deleteFruit(id, auth0Id, db = connection) {
  return db('fruits')
    .where('id', id)
    .first()
    .then((fruit) => authorizeUpdate(fruit, auth0Id))
    .then(() => {
      return db('fruits').where('id', id).delete()
    })
    .then(() => db)
    .then(getFruits)
    .then(sort)
}

function authorizeUpdate(fruit, auth0Id) {
  if (fruit.added_by_user !== auth0Id) {
    throw new Error('Unauthorized')
  }
}
