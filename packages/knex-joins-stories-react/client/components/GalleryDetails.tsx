import { Link, useParams } from 'react-router-dom'
import { useGalleryDetails } from '../hooks/api'
import LoadingIndicator from './LoadingIndicator'
import ErrorMessage from './ErrorMessage'

export default function GalleryDetails() {
  const params = useParams()
  const id = Number(params.id)
  const detail = useGalleryDetails(id)

  if (detail.isLoading) {
    return <LoadingIndicator />
  }

  if (detail.isError || detail.data == undefined) {
    return <ErrorMessage error={detail.error} />
  }

  const { name, description, artworks } = detail.data

  return (
    <>
      <h2>Gallery: {name}</h2>
      <p>{description}</p>
      <h3>Currently showing</h3>
      <ul>
        {artworks.map((artwork) => (
          <li key={artwork.id}>
            <Link to={`/artworks/${artwork.id}`}>{artwork.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
