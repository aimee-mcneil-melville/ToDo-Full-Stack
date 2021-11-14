import { CHANGE_PAGE } from '../actions'

function reducer (state = 'home', action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return action.page
    default:
      return state
  }
}

export default reducer
