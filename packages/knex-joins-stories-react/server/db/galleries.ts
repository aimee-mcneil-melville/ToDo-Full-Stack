import { Gallery, GalleryDetails } from '../../models/gallery.ts'
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

export async function detailsById(gallery_id: number) {
  const data = await connection('galleries')
    .leftJoin('artworks', 'artworks.gallery_id', 'galleries.id')
    .where({ 'galleries.id': gallery_id })
    .select(
      'galleries.id as id',
      'galleries.name as name',
      'galleries.description as description',
      'artworks.id as artwork_id',
      'artworks.name as artwork_name',
      'artworks.medium as artwork_medium',
      'artworks.description as artwork_description'
    )

  if (data.length === 0) {
    return undefined
  }

  const artworks = []
  const { name, description, id } = data[0]
  for (const info of data) {
    if (info.artwork_id != undefined) {
      const { artwork_id, artwork_name, artwork_medium, artwork_description } =
        info
      artworks.push({
        id: artwork_id,
        name: artwork_name,
        medium: artwork_medium,
        description: artwork_description,
      })
    }
  }

  return { id, name, description, artworks } as GalleryDetails
}
