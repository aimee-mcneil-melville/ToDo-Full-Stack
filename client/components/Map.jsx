import React from 'react'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

class Map extends React.Component {
  render () {
    return (
      <div className='column'>
        <MapContainer
          center={[-36.8666700, 174.7666700]}
          zoom={16}
          scrollWheelZoom={true}>
          <TileLayer
            url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGFlbC1yIiwiYSI6ImNrZXM1Zm9iaDJiNmYycW1za2dobDZ4d3gifQ.a5mK2DxNqWhlzvoa8Zxb2Q'/>
          <Marker
            position={[-36.8666700, 174.7666700]}>
            <Popup>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem alias, officiis dolor doloribus aliquam hic eos inventore cum nihil quae, nisi non mollitia eum quo illo velit. Numquam, amet quae?
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
  }
}

export default Map
