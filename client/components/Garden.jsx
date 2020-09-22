import React from 'react'

// import Map from './Map'
// import Events from './Events'

// Remove once component is connected
const fakeGarden = {
  name: 'Kelmarna Gardens',
  description:
    'Kelmarna Gardens is a city farm and organic community garden, situated on 4.5 acres of council land in Ponsonby, close to the heart of Auckland City.',
  url: 'http://www.kelmarnagardens.nz/'
}

const Garden = (props) => {
  const { name, description, url } = props.garden || fakeGarden

  return (
    <>
      <div className="column">
        <h3>{name}</h3>
        <p className="mb-4">{description}</p>
        <a className="word-wrap" href={url}>
          {url}
        </a>
        {/* <Events /> */}
      </div>
      {/* <Map /> */}
    </>
  )
}
export default Garden
