import {
  ADD_BEER,
  DELETE_BEER,
  UPDATE_MULTIPLE,
  UPDATE_QUANTITY,
  Action,
} from '../actions'

interface CartItem {
  id: number
  name: string
  quantity: number
}

const initialState: CartItem[] = []

function reducer(state = initialState, action: Action) {
  const { type, payload } = action
  switch (type) {
    case ADD_BEER:
      return [...state, payload]

    case UPDATE_QUANTITY:
      return state.map((beer) => {
        if (beer.id === payload.id) {
          beer.quantity = payload.amt
        }
        return beer
      })

    case UPDATE_MULTIPLE:
      return state.map((beer) => {
        payload.map((item) => {
          if (item.id === beer.id) {
            beer.quantity = item.quantity
          }
        })
        return beer
      })

    case DELETE_BEER:
      return state.filter((beer) => beer.id !== payload)

    default:
      return state
  }
}

export default reducer
