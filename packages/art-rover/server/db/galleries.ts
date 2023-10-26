import { Gallery } from '../../models/gallery.ts'
import connection from './connection.ts'

export async function all() {
  const galleries = await connection('galleries').select('*')
  return galleries as Gallery[]
}

export async function byId(id: number) {
  const gallery = await connection('galleries')
    .select('*')
    .where({ id })
    .first()
  return gallery as Gallery
}
