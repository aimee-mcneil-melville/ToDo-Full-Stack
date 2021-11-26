import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getAllGardens } from './gardernListHelper'

export default function GardenList () {
  // const testGardenList = [{
  //   id: 0,
  //   name: 'Test Garden',
  //   address: '222 Test St, Testington, Testburg',
  //   description: 'The testiest of all test gardens. The best garden for all your testing needs.',
  //   events: ['event1', 'event2', 'event3']
  // }]

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
    <>
      {gardenList.map((garden) => {
        return <div key={garden.id}>
          <Link to={`/gardens/${garden.id}`}>
            <h2>{garden.name}</h2>
          </Link>
          <h4>Address: {garden.address}</h4>
          <p>{garden.description}</p>
          <a href={garden.url} > <span className='fas fa-home'/>website </a>
        </div>
      })}
    </>
  )
}
