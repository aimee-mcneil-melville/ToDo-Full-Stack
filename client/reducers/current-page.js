import { NAVIGATE } from '../actions/navigate'

const currentPage = (state = 'listing', action) => {
  switch (action.type) {
    case NAVIGATE:
      return action.destination
    default:
      return state
  }
}

export default currentPage
