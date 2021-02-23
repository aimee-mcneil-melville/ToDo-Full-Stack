import React from 'react'
import { Link } from 'react-router-dom'

import continentData from '../../data/continents'

function Continent (props) {
  const { name } = props.match.params
  const continent = continentData[name]

  return (
    <div>
      <h2>{name}</h2>
      <img src={`/images/${continent.image}`} />
      <ul>
        {continent.countries.map(country => <li key={country.code}>
          <Link to={`/continent/${name}/${country.code}`}>{country.name}</Link>
        </li>)}
      </ul>
    </div>
  )
}

export default Continent
