import { dispatch } from '../store'
import { setUserLocation } from '../actions/user'

export function getUserLocation (setLocation, browser = navigator) {
  browser.geolocation?.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords
    dispatch(setUserLocation({ latitude, longitude }))
    setLocation({ userCoordinates: { lat: latitude, lon: longitude } })
  })
}
