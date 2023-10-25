import { Artwork } from './artwork'

export interface GalleryData {
  name: string
  description: string
}

export interface Gallery extends GalleryData {
  id: number
}

export interface GalleryDetails extends Gallery {
  artworks: Artwork[]
}
