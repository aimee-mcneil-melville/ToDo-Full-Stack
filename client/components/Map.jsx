import React, { useEffect } from 'react'
import { getMap } from '../apiClient'

function Map () {
  useEffect(()=> {
    getMap()
  })
  

// fakeMap can be deleted once our API is in place and using our databse
  // const fakeMap = [
  //   {
  //     id: 1,
  //     name: 'Kelmarna Gardens',
  //     address: '12 Hukanui Crescent',
  //     description: 'Kelmarna Gardens is a city farm and organic community garden, situated on 4.5 acres of council land in Ponsonby, close to the heart of Auckland City.',
  //     lat: -36.86011508905973,
  //     lon: 174.7330772002716,
  //     url: 'http://www.kelmarnagardens.nz/'
  //   }
  // ]
  return (
    <div className='column'>
      <div id="mapid"/>
      {/* <img src="/placeholder_auckland.jpg"/> */}
      <p>
        {/* {fakeMap.map(garden => (garden.address))} */}
      </p>
    </div>
  )
}

export default Map
