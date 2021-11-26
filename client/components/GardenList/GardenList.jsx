import React, { useState, useEffect } from 'react'

export default function GardenList () {
  // const testGardenList = [{
  //   id: 0,
  //   name: 'Test Garden',
  //   address: '222 Test St, Testington, Testburg',
  //   description: 'The testiest of all test gardens. The best garden for all your testing needs.',
  //   events: ['event1', 'event2', 'event3']
  // }]

  const [gardenList, setGardenList] = useState(testGardenList)

  useEffect

  return (
    <>
      {gardenList.map((garden) => {
        return <div key={garden.id}>
          <h2>{garden.name}</h2>
          <h3>{garden.address}</h3>
          <p>{garden.description}</p>
          <p>Events: {garden.events.length}</p>
        </div>
      })}
    </>
  )
}
