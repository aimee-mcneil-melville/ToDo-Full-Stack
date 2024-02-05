export interface Artwork {
  id: number
  title: string
  comments: string[]
  imageUrl: string
  artist: {
    name: string
    url: string
  }
  license: {
    url: string
    name: string
  }
}
