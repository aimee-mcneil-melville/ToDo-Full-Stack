import React from 'react'
import { Link } from 'react-router-dom'

import continentData from '../../data/continents'

function Nav (props) {
  const continents = Object.keys(continentData)
  const url = props.location.pathname

  return (
    <div>
      <h2>Nav</h2>
      <ul>
        <li><Link to='/'>Home</Link></li>
      </ul>
      <ul>
        {continents.map((name, i) => {
          return <li key={i} className={url.includes(name) ? 'selected' : ''}>
            <Link to={`/continent/${name}`}>{name}</Link>
          </li>
        })}
      </ul>
    </div>
  )
}

export default Nav
