import { useParams } from 'react-router-dom'

import { usePuppy } from '../hooks/api.ts'
import ErrorMessage from '../components/ErrorMessage.tsx'
import LoadingIndicator from '../components/LoadingIndicator.tsx'

export default function ViewPuppy() {
  const params = useParams()
  const id = Number(params.id)
  if (isNaN(id)) {
    throw new Error(`Missing route param "id"`)
  }

  const puppy = usePuppy(id)

  if (puppy.isLoading) {
    return <LoadingIndicator />
  }

  if (puppy.isError || !puppy.data) {
    return <ErrorMessage error={puppy.error} />
  }

  const { name, breed, owner, image } = puppy.data
  return (
    <div className="puppy">
      <img className="img-circle" src={image} alt={name} />
      <h2>{name}</h2>
      <div>Breed: {breed}</div>
      <div>Owner: {owner}</div>
      <a href={`/${id}/edit`}>Edit</a>
    </div>
  )
}
