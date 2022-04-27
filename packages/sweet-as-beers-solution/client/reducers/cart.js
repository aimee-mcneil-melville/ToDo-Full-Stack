import { ADD_BEER, DELETE_BEER, UPDATE_MULTIPLE, UPDATE_QUANTITY } from '../actions'

function reducer (state = [], action) {
  switch (action.type) {
    case ADD_BEER:
      return [...state, action.beer]

    case UPDATE_QUANTITY:
      return state.map(beer => {
        if (beer.id === action.id) {
          beer.quantity = action.amt
        }
        return beer
      })

    case UPDATE_MULTIPLE:
      return state.map(beer => {
        const updatedAmt = action.changes[beer.id]
        if (updatedAmt) {
          beer.quantity = updatedAmt
        }
        return beer
      })

    case DELETE_BEER:
      return state.filter(beer => beer.id !== action.id)

    default:
      return state
  }
}

export default reducer
