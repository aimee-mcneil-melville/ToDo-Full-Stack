import connection from './connection'
import type { Fruit } from '../../models/Fruit'

export function getFruits(db = connection): Promise<Fruit[]> {
  return db('fruit').select()
}
