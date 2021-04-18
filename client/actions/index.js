import { getFriends } from '../apis/fruits'

export const SET_FRUITS = 'SET_FRUITS'

export function setFruits (fruits) {
  return {
    type: SET_FRUITS,
    fruits
  }
}

export function fetchFriends () {
  return dispatch => {
    return getFriends()
      .then(fruits => {
        dispatch(setFruits(fruits))
        return null
      })
  }
}
