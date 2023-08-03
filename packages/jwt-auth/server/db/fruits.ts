import connection from './connection.ts'
import { FruitSnakeCase } from '../../models/fruit.ts'

export function getFruits(db = connection) {
  return db('fruits')
    .select(
      'id',
      'name',
      'average_grams_each as averageGramsEach',
      'added_by_user as addedByUser'
    )
    .orderBy('id')
}

export function addFruit(fruit: FruitSnakeCase, db = connection) {
  return db('fruits').insert(fruit)
}

export function updateFruit(newFruit: FruitSnakeCase, db = connection) {
  return db('fruits').where('id', newFruit.id).update(newFruit)
}

export function deleteFruit(id: number, db = connection) {
  return db('fruits').where('id', id).delete()
}

export function userCanEdit(fruitId: number, auth0Id: string, db = connection) {
  return db('fruits')
    .where('id', fruitId)
    .first()
    .then((fruit: FruitSnakeCase) => {
      if (fruit.added_by_user !== auth0Id) {
        throw new Error('Unauthorized')
      }
    })
}
