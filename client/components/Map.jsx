import React from 'react'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function Map (props) {
  console.log('Map.jsx > props.gardens: ', props)
  return (
    <div className='column'>
      <MapContainer
        center={[-36.8666700, 174.7666700]}
        zoom={12}
        scrollWheelZoom={true}>
        <TileLayer
          url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGFlbC1yIiwiYSI6ImNrZXM1Zm9iaDJiNmYycW1za2dobDZ4d3gifQ.a5mK2DxNqWhlzvoa8Zxb2Q'/>
        {props.coordinates?.map(location => {
          return <Marker key={location.lat}
            position={[location.lat, location.lon]}>
            <Popup>
              {props.address}
            </Popup>
          </Marker>
        })}
      </MapContainer>
    </div>
  )
}

export default Map
