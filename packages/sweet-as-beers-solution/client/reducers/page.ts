import { CHANGE_PAGE, Action } from '../actions'

const initialState = 'home'

function reducer(state = initialState, action: Action) {
  const { type, payload } = action
  switch (type) {
    case CHANGE_PAGE:
      return payload
    default:
      return state
  }
}

export default reducer
