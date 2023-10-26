import { Link } from 'react-router-dom'
import { useArtworks } from '../hooks/api.ts'
import LoadingIndicator from './LoadingIndicator.tsx'
import ErrorMessage from './ErrorMessage.tsx'

export default function ArtworkList() {
  const artworks = useArtworks()
  if (artworks.isLoading) {
    return <LoadingIndicator />
  }

  if (artworks.isError || artworks.data == undefined) {
    return <ErrorMessage error={artworks.error} />
  }

  return (
    <>
      <h2>artworks</h2>
      {artworks.data.map((artwork) => (
        <div key={artwork.id}>
          <h3>
            <Link to={`/artworks/${artwork.id}`}>{artwork.name}</Link>
          </h3>
          <p>
            <em>({artwork.medium})</em>
          </p>
          <p>{artwork.description}</p>
        </div>
      ))}
    </>
  )
}
