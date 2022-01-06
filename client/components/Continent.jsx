import React from 'react'
import { Link, useParams } from 'react-router-dom'

import continentData from '../../data/continents'

function Continent () {
  const { name } = useParams()
  const continent = continentData[name]

  return (
    <div>
      <h2>{name}</h2>
      <img src={`/images/${continent.image}`} />
      <ul>
        {continent.countries.map(country => <li key={country.code}>
          {/* TODO: Review Link stuff: https://reactrouter.com/docs/en/v6/upgrading/v5#note-on-link-to-values */}
          <Link to={`/continent/${name}/${country.code}`}>{country.name}</Link>
        </li>)}
      </ul>
    </div>
  )
}

export default Continent
