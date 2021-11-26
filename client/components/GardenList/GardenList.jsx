import React, { useState } from 'react'

export default function GardenList () {
  const testGardenList = [{
    id: 0,
    name: 'Test Garden',
    description: 'The testiest of all test gardens. The best garden for all your testing needs.',
    address: '222 Test St, Testington, Testburg',
    url: 'testgarden.com',
    events: ['event1', 'event2', 'event3']
  }]

  const [gardenList, setGardenList] = useState(testGardenList)

  // setGardenList(testGardenList)

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
