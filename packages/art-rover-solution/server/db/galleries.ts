import { Artwork } from '../../models/artwork.ts'
import { Gallery, GalleryDetails } from '../../models/gallery.ts'
import connection from './connection.ts'

export async function all() {
  const galleries = await connection('galleries').select('*')
  return galleries as Gallery[]
}

export async function byId(id: number) {
  const results = await connection('galleries')
    .leftJoin('artworks', 'galleries.id', 'artworks.gallery_id')
    .select(
      'galleries.*',
      'artworks.id as artwork_id',
      'artworks.name as artwork_name',
      'artworks.description as artwork_description',
      'artworks.medium as artwork_medium'
    )
    .where('galleries.id', id)

  if (!results.length) {
    return undefined
  }

  const artworks = [] as Artwork[]
  const { name, description } = results[0]
  for (const row of results) {
    if (row.artwork_id != undefined) {
      artworks.push({
        id: row.artwork_id,
        name: row.artwork_name,
        description: row.artwork_description,
        medium: row.artwork_medium,
      })
    }
  }

  return { id, name, description, artworks } as GalleryDetails
}
