import { Artwork } from '../../models/artwork.ts'
import connection from './connection.js'

export async function all() {
  const artworks = await connection('artworks').select('*')
  return artworks as Artwork[]
}

export async function byId(id: number) {
  const data = await connection('artworks').select('*').where({ id }).first()
  return data as Artwork
}
