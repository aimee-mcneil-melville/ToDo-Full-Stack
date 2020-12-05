import { dispatch } from '../store'
import { setUserLocation } from '../actions/user'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import { getGardens } from '../api/gardens'

export function getUserLocation (setLocation, browser = navigator) {
  browser.geolocation?.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords
    dispatch(setUserLocation({ latitude, longitude }))
    setLocation({ userCoordinates: { lat: latitude, lon: longitude } })
  })
}

export function getGardenLocations () {
  dispatch(setWaiting())
  return getGardens()
    .then((gardens) => {
      dispatch(clearWaiting())
      return gardens
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}
