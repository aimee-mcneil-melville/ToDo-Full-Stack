import { getState, dispatch } from '../../store'
import { setWaiting, clearWaiting } from '../../actions/waiting'
import { setLocation } from '../../actions/location'
import { showError } from '../../actions/error'
import requestor from '../../consume'

export function getUserLocation(setCoords, isMounted, browser = navigator) {
  const storeState = getState()
  const { lat, lon } = storeState.location
  if (lat) {
    setCoords({ lat, lon })
    return
  }

  browser.geolocation?.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords
    const location = { lat: latitude, lon: longitude }

    dispatch(setLocation(location))
    // Getting the geolocation from the browser can take a long time, and
    // sometimes the user navigates away from Home before the location comes
    // back
    // This conditional ensures we only set the userCoordinates state and
    // re-render if the Home component is still actually mounted in the DOM.
    // We could do this for all of our async useEffect functions, but usually
    // they still run fast enough that we don't need to worry
    isMounted() && setCoords(location)
  })
}

export function getGardenLocations(consume = requestor) {
  dispatch(setWaiting())
  return consume('/gardens')
    .then((res) => {
      dispatch(clearWaiting())
      const { gardens } = res.body
      const gardenCoords = gardens.map(({ lat, lon }) => {
        return { lat, lon }
      })
      const names = gardens.map(({ name }) => name)
      const addrs = gardens.map(({ address }) => address)
      return {
        gardenCoords,
        addrs,
        names,
      }
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}
