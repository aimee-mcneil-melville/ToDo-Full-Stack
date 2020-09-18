import React from 'react'

import Events from './Events'

const Garden = () => {
  return (
    <>
    <header>
      <h3>Kelmarna Gardens</h3>
    </header>

      <div>
        <p>
      Kelmarna Gardens is a city farm and organic community garden, situated on 4.5 acres of council land in Ponsonby, close to the heart of Auckland City.
        </p>
        <a href="http://www.kelmarnagardens.nz/">http://www.kelmarnagardens.nz</a>
        <Events />
      </div>
    </>
  )
}

export default Garden
