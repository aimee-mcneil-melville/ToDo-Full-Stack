import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getAllGardens } from './gardernListHelper'

export default function GardenList () {
  const [gardenList, setGardenList] = useState([])

  useEffect(() => {
    // get api
    getAllGardens()
      .then(gardens => {
        setGardenList(gardens)
        return null
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <ul>
      {gardenList.map((garden) => {
        return <li key={garden.id}>
          <Link to={`/gardens/${garden.id}`}>
            <h2>{garden.name}</h2>
          </Link>
          <h4>Address: {garden.address}</h4>
          <p>{garden.description}</p>

        </li>
      })}
    </ul>
  )
}
