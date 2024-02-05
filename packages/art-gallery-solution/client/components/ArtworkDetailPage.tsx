import { useParams } from 'react-router-dom'

import { Artwork } from '../../models/Artwork.ts'
import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import LoadingIndicator from './LoadingIndicator.tsx'
import ErrorMessage from './ErrorMessage.tsx'

interface Props extends Artwork {}

function ArtworkDetailPage() {
  const params = useParams()
  const id = Number(params.id)

  const artwork = useQuery({
    queryKey: ['artwork', id],
    queryFn: async () => {
      const res = await request.get(`/api/v1/artwork/${id}`)
      return res.body as Artwork
    },
  })

  if (isNaN(id)) {
    throw new Error(`Invalid id: ${params.id}`)
  }

  if (artwork.isLoading) {
    return <LoadingIndicator />
  }

  if (artwork.isError || !artwork.data) {
    return <ErrorMessage error={artwork.error} />
  }

  return <ArtworkDetail {...artwork.data} />
}

function ArtworkDetail({ artist, license, title, imageUrl, comments }: Props) {
  return (
    <>
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} />
      <dl>
        <dt>Artist</dt>
        <dd>
          <a href={artist.url}>{artist.name}</a>
        </dd>
        <dt>License</dt>
        <dd>
          <a href={license.url}>{license.name}</a>
        </dd>
      </dl>
      {comments.length > 0 && <h4>comments</h4>}
      {comments.map((comment) => (
        <p>{comment}</p>
      ))}
    </>
  )
}

export default ArtworkDetailPage
