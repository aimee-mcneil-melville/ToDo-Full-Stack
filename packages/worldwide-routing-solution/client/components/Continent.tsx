import { useParams, Link } from 'react-router-dom'

import data from '../../data/continents'

export default function Continent() {
  const { name } = useParams()
  const continent = data[name as keyof typeof data]

  if (!continent) {
    return <p>No continent found called: {name}</p>
  }

  return (
    <section>
      <h2>{name}</h2>
      <img src={`/images/${continent.image}`} alt={`name`} />
      <ul>
        {continent.countries.map((country) => (
          <li key={country.code}>
            <Link to={`/continent/${name}/${country.code}`}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
