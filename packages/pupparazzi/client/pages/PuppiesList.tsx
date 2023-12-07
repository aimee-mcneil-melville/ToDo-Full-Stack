import { Link } from 'react-router-dom'

import { usePuppies } from '../hooks/api.ts'
import ErrorMessage from '../components/ErrorMessage.tsx'
import LoadingIndicator from '../components/LoadingIndicator.tsx'

export default function PuppiesList() {
  const puppies = usePuppies()

  if (puppies.isLoading) {
    return <LoadingIndicator />
  }

  if (puppies.isError || !puppies.data) {
    return <ErrorMessage error={puppies.error} />
  }

  return (
    <div className="container">
      {puppies.data.map((pup) => (
        <div key={pup.id} className="puppy-list">
          <Link to={`/${pup.id}`}>
            <img className="img-circle" src={pup.image} alt={pup.name} />
            <span>{pup.name}</span>
          </Link>
        </div>
      ))}
      <Link to="/new">Add Puppy</Link>
    </div>
  )
}
