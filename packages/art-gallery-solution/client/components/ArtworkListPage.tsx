import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Link } from 'react-router-dom'

import { Artwork } from '../../models/Artwork.ts'
import LoadingIndicator from './LoadingIndicator.tsx'
import ErrorMessage from './ErrorMessage.tsx'

function ArtworkListPage() {
  const artworks = useQuery({
    queryKey: ['artwork'],
    queryFn: async () => {
      const res = await request.get('/api/v1/artwork')
      return res.body as Artwork[]
    },
  })

  if (artworks.isLoading) {
    return <LoadingIndicator />
  }

  if (artworks.isError || !artworks.data) {
    return <ErrorMessage error={artworks.error} />
  }

  return (
    <ul>
      {artworks.data.map((artwork) => (
        <li key={artwork.id}>
          <Link to={`/${artwork.id}`}>
            {artwork.title} by {artwork.artist.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ArtworkListPage
