import connection from './connection.ts'
import { Fruit } from '../../models/fruit.ts'

export function getAllFruits(db = connection): Promise<Fruit[]> {
  return db('fruit').select()
}
