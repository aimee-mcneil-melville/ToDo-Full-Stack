export interface GalleryData {
  name: string
  description: string
}

export interface Gallery extends GalleryData {
  id: number
}

import { Artwork } from './artwork.ts'

export interface GalleryDetails extends Gallery {
  artworks: Artwork[]
}
