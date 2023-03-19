import connection from './connection'
import { Fruit } from '../../models/fruit'

export function getFruits(db = connection): Promise<Fruit[]> {
  return db<Fruit>('fruit').select()
}
