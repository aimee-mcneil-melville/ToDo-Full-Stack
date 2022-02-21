import React from 'react'
import * as L from 'leaflet'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Map({
  addresses,
  coordinates,
  userCoordinates,
  names,
}) {
  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [21, 34],
      shadowSize: [50, 64],
      iconAnchor: [10, 35],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    },
  })

  const greenIcon = new LeafIcon({
    iconUrl:
      'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF',
  })

  return (
    <div className="map-container">
      <MapContainer
        className="map"
        center={[-36.86667, 174.76667]}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGFlbC1yIiwiYSI6ImNrZXM1Zm9iaDJiNmYycW1za2dobDZ4d3gifQ.a5mK2DxNqWhlzvoa8Zxb2Q" />
        {coordinates.map((location, i) => {
          return (
            <Marker
              key={i}
              position={[location.lat, location.lon]}
              draggable={true}
            >
              <Popup>
                <h3>{names[i]}</h3>
                {addresses[i]}
              </Popup>
            </Marker>
          )
        })}
        {userCoordinates && userCoordinates.lat && (
          <Marker
            position={[userCoordinates.lat, userCoordinates.lon]}
            icon={greenIcon}
          >
            <Popup>
              <h3>Your Location</h3>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
