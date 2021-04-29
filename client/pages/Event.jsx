import React from 'react'

function Event () {
  const details = {
    title: 'Wednesday Weeding',
    gardenName: 'Kelmarna Gardens',
    gardenAddress: '12 Hukanui Crescent, Ponsonby, Auckland 1021',
    date: '29th April 2021',
    volunteers: 'Volunteers Needed: 8',
    description: 'This is a really cool description of this really cool event coming up.'
  }

  return (
    <>
      <h1>{details.title}</h1>
      <h2>{details.gardenName}</h2>
      <h2>{details.gardenAddress}</h2>
      <h3>{details.date}</h3>
      <h3>{details.volunteers}</h3>
      <p>{details.description}</p>
    </>
  )
}

export default Event
