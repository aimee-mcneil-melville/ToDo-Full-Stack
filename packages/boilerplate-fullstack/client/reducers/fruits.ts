import { SET_FRUITS } from '../actions/index.ts'
import type { Action } from '../actions/index.ts'

const initialState = [] as string[]

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action
  switch (type) {
    case SET_FRUITS:
      return payload
    default:
      return state
  }
}

export default reducer
