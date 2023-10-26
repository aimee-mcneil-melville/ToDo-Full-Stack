import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Artwork } from '../../models/artwork.ts'
import { Gallery } from '../../models/gallery.ts'

export function useArtworks() {
  return useQuery({
    queryKey: ['artworks'],
    queryFn: async () => {
      const data = await request.get('/api/v1/artworks')
      return data.body as Artwork[]
    },
  })
}

export function useArtworkDetails(id: number) {
  return useQuery({
    queryKey: ['artworks', id],
    queryFn: async () => {
      const data = await request.get(`/api/v1/artworks/${id}`)
      return data.body as Artwork
    },
  })
}

export function useGalleries() {
  return useQuery({
    queryKey: ['galleries'],
    queryFn: async () => {
      const data = await request.get('/api/v1/galleries')
      return data.body as Gallery[]
    },
  })
}

export function useGalleryDetails(id: number) {
  return useQuery({
    queryKey: ['galleries', id],
    queryFn: async () => {
      const data = await request.get(`/api/v1/galleries/${id}`)
      return data.body as Gallery
    },
  })
}
