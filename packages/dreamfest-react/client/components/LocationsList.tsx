import LocationsNav from './LocationsNav.tsx'
import useLocations from '../hooks/use-locations.ts'

export default function LocationsList() {
  const { isLoading, isError, data } = useLocations()

  if (isLoading) {
    return (
      <>
        <LocationsNav />
        Loading...
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
              <a href={`/locations/${data.id}/edit`}>edit location</a>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
