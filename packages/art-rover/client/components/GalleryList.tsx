import { Link } from 'react-router-dom'
import { useGalleries } from '../hooks/api.ts'
import LoadingIndicator from './LoadingIndicator.tsx'
import ErrorMessage from './ErrorMessage.tsx'

export default function GalleryList() {
  const galleries = useGalleries()
  if (galleries.isLoading) {
    return <LoadingIndicator />
  }

  if (galleries.isError || galleries.data == undefined) {
    return <ErrorMessage error={galleries.error} />
  }

  return (
    <>
      <h2>galleries</h2>
      {galleries.data?.map((gallery) => (
        <div key={gallery.id}>
          <h3>
            <Link to={`/galleries/${gallery.id}`}>{gallery.name}</Link>
          </h3>
          <p>{gallery.description}</p>
        </div>
      ))}
    </>
  )
}
