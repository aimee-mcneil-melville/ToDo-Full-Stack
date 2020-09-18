import React from 'react'

import Events from './Events'
import Map from './Map'

const Garden = () => {
  return (
    <>
      <div className="column">
        <h3>Kelmarna Gardens</h3>
        <p className="mb-4">
      Kelmarna Gardens is a city farm and organic community garden, situated on 4.5 acres of council land in Ponsonby, close to the heart of Auckland City.
        </p>
        <a className="word-wrap" href="http://www.kelmarnagardens.nz/">http://www.kelmarnagardens.nz</a>
        <Events />
      </div>
      <Map/>
    </>
  )
}

export default Garden
