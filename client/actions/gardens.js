import { getGardens } from '../api/gardens'

export const REQUEST_GARDENS = 'REQUEST_GARDENS'
export const RECEIVE_GARDENS = 'RECEIVE_GARDENS'
export const SHOW_ERROR = 'SHOW_ERROR'

export const requestGardens = () => {
  return {
    type: REQUEST_GARDENS
  }
}

export const receiveGardens = (gardens) => {
  return {
    type: RECEIVE_GARDENS,
    gardens
  }
}

export const showError = (errorMessage) => {
  return {
    type: SHOW_ERROR,
    errorMessage
  }
}

export function fetchGardens () {
  return (dispatch) => {
    dispatch(requestGardens())
    return getGardens()
      .then((res) => {
        dispatch(receiveGardens(res))
        return null
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}
