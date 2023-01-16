import { getFruits } from '../apis/fruits'
import type { ThunkAction } from '../store'

export type Action = { type: typeof SET_FRUITS; payload: string[] }

export const SET_FRUITS = 'SET_FRUITS'

export function setFruits(fruits: string[]): Action {
  return {
    type: SET_FRUITS,
    payload: fruits,
  }
}

export function fetchFruits(): ThunkAction {
  return (dispatch) => {
    return getFruits().then((fruits) => {
      dispatch(setFruits(fruits))
    })
  }
}
