import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllGardens } from './gardensHelper'
import { showError } from '../../../actions/error'
import { dispatch } from '../../../store'

export default function Gardens () {
  const [gardenList, setGardenList] = useState([])

  useEffect(() => {
    getAllGardens()
      .then(gardens => {
        setGardenList(gardens)
        return null
      })
      .catch(err => {
        dispatch(showError(error.message))
        return false
      }
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
