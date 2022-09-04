const connection = require('./connection')

module.exports = {
  getFruits,
  addFruit,
  updateFruit,
  deleteFruit,
  userCanEdit,
}

function sort(fruitArray) {
  const allFruits = [...fruitArray]
  allFruits.sort((a, b) => a.id - b.id)
  return allFruits
}

function getFruits(db = connection) {
  return db('fruits')
    .join('users', 'added_by_user', 'auth0_id')
    .select(
      'id',
      'name',
      'average_grams_each as averageGramsEach',
      'added_by_user as addedByUser',
      'username',
      'icon'
    )
    .then((fruits) => sort(fruits))
}

function addFruit(fruit, db = connection) {
  return db('fruits').insert(fruit)
}

function updateFruit(newFruit, db = connection) {
  return db('fruits').where('id', newFruit.id).update(newFruit)
}

function deleteFruit(id, db = connection) {
  return db('fruits').where('id', id).delete()
}

function userCanEdit(fruitId, auth0Id, db = connection) {
  return db('fruits')
    .where('id', fruitId)
    .first()
    .then((fruit) => {
      if (fruit.added_by_user !== auth0Id) {
        throw new Error('Unauthorized')
      }
    })
}
