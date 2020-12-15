import { dispatch } from '../store'
import { setUserLocation } from '../actions/user'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import { getGardens } from '../api/gardens'

export function getUserLocation (setLocation, browser = navigator) {
  browser.geolocation?.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords
    dispatch(setUserLocation({ latitude, longitude }))
    setLocation({ lat: latitude, lon: longitude })
  })
}

export function getGardenLocations (setGardenCoords, setAddresses) {
  dispatch(setWaiting())
  return getGardens()
    .then((gardens) => {
      dispatch(clearWaiting())
      const gardensCoordinates = gardens.map(({ lat, lon }) => {
        return { lat, lon }
      })
      const addresses = gardens.map(({ address }) => address)
      setGardenCoords(gardensCoordinates)
      setAddresses(addresses)
      return null
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}
