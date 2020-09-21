import request from 'superagent'
import L from 'leaflet'

const rootUrl = '/api/v1'

export function getGardens () {
  return request.get(rootUrl + '/gardens')
    .then(res => {
      return res.body.gardens
    })
}

export function getMap () {
  const mymap = L.map('mapid').setView([-36.8666700, 174.7666700], 13)

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWljaGFlbC1yIiwiYSI6ImNrZXM1Zm9iaDJiNmYycW1za2dobDZ4d3gifQ.a5mK2DxNqWhlzvoa8Zxb2Q'
  }).addTo(mymap)
}