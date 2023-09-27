import LineUpNav from './LineUpNav'
import { Location } from '../../models/Location.ts'

interface Props {
  locations: Location[]
}

function ShowLocation({ locations }: Props) {
  return (
    <>
      <LineUpNav />
      <h2>locations:</h2>
      <ul className="cards">
        {locations.map(({ id, name, description }) => (
          <li key={id} className="card">
            <div className="location">
              <span className="title">{name}</span>
              <p className="data">{description}</p>
              <a href={`/locations/${id}/edit`}>edit location</a>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ShowLocation
