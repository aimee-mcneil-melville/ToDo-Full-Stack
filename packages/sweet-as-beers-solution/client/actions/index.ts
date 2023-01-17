export const CHANGE_PAGE = 'NAVIGATE'
export const ADD_BEER = 'ADD_BEER'
export const UPDATE_QUANTITY = 'UPDATE_ONE_QUANTITY'
export const UPDATE_MULTIPLE = 'UPDATE_MULTIPLE_BEERS'
export const DELETE_BEER = 'TRASH_BEER'

export type Action =
  | { type: 'NAVIGATE'; payload: string }
  | {
      type: 'ADD_BEER'
      payload: { id: number; name: string; quantity: number }
    }
  | { type: 'UPDATE_ONE_QUANTITY'; payload: { id: number; amt: number } }
  | {
      type: 'UPDATE_MULTIPLE_BEERS'
      payload: { id: number; quantity: number }[]
    }
  | { type: 'TRASH_BEER'; payload: number }

export const navigate = (destination: string): Action => {
  return {
    type: CHANGE_PAGE,
    payload: destination,
  }
}

export const addBeer = (id: number, name: string): Action => {
  return {
    type: ADD_BEER,
    payload: {
      id,
      name,
      quantity: 1,
    },
  }
}

export const updateBeerAmount = (id: number, newQuantity: number): Action => {
  return {
    type: UPDATE_QUANTITY,
    payload: { id, amt: newQuantity },
  }
}
// need common type
export const updateMultiple = (
  objArrWithNewQuants: { id: number; quantity: number }[]
): Action => {
  return {
    type: UPDATE_MULTIPLE,
    payload: objArrWithNewQuants,
  }
}

export const trashBeer = (id: number): Action => {
  return {
    type: DELETE_BEER,
    payload: id,
  }
}
