import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import continentData from '../../data/continents'

function Nav(props) {
  const continents = Object.keys(continentData)
  const url = useLocation().pathname

  return (
    <div>
      <h2>Nav</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <ul>
        {continents.map((name, i) => {
          // This className stuff is to make the selected continent bold in the Nav
          // But there is a bug - it doesn't go bold for continents whose name is two words, e.g. "North America"
          return (
            <li key={i} className={url.includes(name) ? 'selected' : ''}>
              <Link to={`/continent/${name}`}>{name}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Nav
