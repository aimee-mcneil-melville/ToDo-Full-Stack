import { useParams, Link, Outlet } from 'react-router-dom'

import data from '../../data/continents'

export default function Continent() {
  const { id } = useParams()
  const continent = data[id as keyof typeof data]

  if (!continent) {
    return <p>No continent found called: {id}</p>
  }

  return (
    <main className="main">
      <section>
        <h2>{id}</h2>
        <img src={`/images/${continent.image}`} alt={`name`} />
        <ul>
          {continent.countries.map((country) => (
            <li key={country.code}>
              <Link to={`${country.code}`}>{country.name}</Link>
            </li>
          ))}
        </ul>
      </section>
      <Outlet />
    </main>
  )
}
