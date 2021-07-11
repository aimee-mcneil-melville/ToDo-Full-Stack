import React from 'react'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Map ({ addresses, coordinates, userCoordinates }) {
  return (
    <div className='map-container'>
      <MapContainer className='map'
        center={[-36.8666700, 174.7666700]}
        zoom={11}
        scrollWheelZoom={true}>
        <TileLayer
          url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGFlbC1yIiwiYSI6ImNrZXM1Zm9iaDJiNmYycW1za2dobDZ4d3gifQ.a5mK2DxNqWhlzvoa8Zxb2Q'/>
        {coordinates.map((location, i) => {
          return <Marker key={i}
            position={[location.lat, location.lon]}
            draggable={true}
          >
            <Popup>
              {addresses[i]}
            </Popup>
          </Marker>
        })}
        {userCoordinates &&
          <Marker
            position={[userCoordinates.lat, userCoordinates.lon]}
          >
            <Popup>
              Your Location
            </Popup>
          </Marker>
        }
      </MapContainer>
    </div>
  )
}
