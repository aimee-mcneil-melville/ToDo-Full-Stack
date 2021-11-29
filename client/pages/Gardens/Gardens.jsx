import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { showError } from '../../actions/error'

import { getAllGardens } from './gardensHelper'

export default function Gardens () {
  const [gardenList, setGardenList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    getAllGardens()
      .then(gardens => {
        setGardenList(gardens)
        return null
      })
      .catch(err => {
        dispatch(showError(err.message))
        return false
      })
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
