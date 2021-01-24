import { dispatch } from '../store'
import { setWaiting, clearWaiting } from '../actions/waiting'
import { showError } from '../actions/error'
import { getGardens } from '../api/gardens'

export function getUserLocation (setLocation, isMounted, browser = navigator) {
  browser.geolocation?.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords
    // Getting the geolocation from the browser can take a long time, and
    // sometimes the user navigates away from Home before the location comes
    // back
    // This conditional ensures we only set the userCoordinates state and
    // re-render if the Home component is still actually mounted in the DOM.
    // We could do this for all of our async useEffect functions, but usually
    // they still run fast enough that we don't need to worry
    isMounted() && setLocation({ lat: latitude, lon: longitude })
  })
}

export function getGardenLocations () {
  dispatch(setWaiting())
  return getGardens()
    .then((gardens) => {
      dispatch(clearWaiting())
      const gardenCoords = gardens.map(({ lat, lon }) => {
        return { lat, lon }
      })
      const addrs = gardens.map(({ address }) => address)
      return {
        gardenCoords,
        addrs
      }
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}
