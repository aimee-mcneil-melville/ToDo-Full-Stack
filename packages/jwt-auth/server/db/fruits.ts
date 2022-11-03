import connection from './connection'
import {Fruit} from '../../types'

function sort(fruitArray: Fruit[]) {
  const allFruits = [...fruitArray]
  allFruits.sort((a, b) => a.id - b.id)
  return allFruits
}

export function getFruits(db = connection) {
  return db('fruits')
    .select(
      'id',
      'name',
      'average_grams_each as averageGramsEach',
      'added_by_user as addedByUser'
    )
    .then((fruits: Fruit[]) => sort(fruits))
}

export function addFruit(fruit: Fruit, db = connection) {
  return db('fruits').insert(fruit)
}

export function updateFruit(newFruit: Fruit, db = connection) {
  return db('fruits').where('id', newFruit.id).update(newFruit)
}

export function deleteFruit(id: number, db = connection) {
  return db('fruits').where('id', id).delete()
}

export function userCanEdit(fruitId: number, auth0Id: string, db = connection) {
  return db('fruits')
    .where('id', fruitId)
    .first()
    .then((fruit: Fruit) => {
      if (fruit.added_by_user !== auth0Id) {
        throw new Error('Unauthorized')
      }
    })
}
