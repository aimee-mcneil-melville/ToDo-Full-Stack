import { useParams } from 'react-router-dom'
import { useGalleryDetails } from '../hooks/api.ts'
import LoadingIndicator from './LoadingIndicator.tsx'
import ErrorMessage from './ErrorMessage.tsx'

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

  const { name, description } = detail.data

  return (
    <>
      <h2>Gallery: {name}</h2>
      <p>{description}</p>
    </>
  )
}
