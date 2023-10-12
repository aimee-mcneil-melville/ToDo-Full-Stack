import LocationsNav from './LocationsNav.tsx'
import { Link } from 'react-router-dom'
import { useLocations } from '../hooks/api.ts'
import LoadingIndicator from './LoadingIndicator.tsx'

export default function LocationsList() {
  const { isLoading, isError, data } = useLocations()

  if (isLoading) {
    return (
      <>
        <LocationsNav />
        <LoadingIndicator />
      </>
    )
  }

  if (isError) {
    return <>Oops</>
  }

  return (
    <>
      <LocationsNav />
      <h2>locations:</h2>
      <ul className="cards">
        {data?.locations.map((data) => (
          <li key={data.id} className="card">
            <div className="location">
              <span className="title">{data.name}</span>
              <p className="data">{data.description}</p>
              <Link to={`/locations/${data.id}/edit`}>edit location</Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
