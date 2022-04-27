export const CHANGE_PAGE = 'NAVIGATE'
export const ADD_BEER = 'ADD_BEER'
export const UPDATE_QUANTITY = 'UPDATE_ONE_QUANTITY'
export const UPDATE_MULTIPLE = 'UPDATE_MULTIPLE_BEERS'
export const DELETE_BEER = 'TRASH_BEER'

export const navigate = (destination) => {
  return {
    type: CHANGE_PAGE,
    page: destination
  }
}

export const addBeer = (id, name) => {
  return {
    type: ADD_BEER,
    beer: {
      id,
      name,
      quantity: 1
    }
  }
}

export const updateBeerAmount = (id, newQuantity) => {
  return {
    type: UPDATE_QUANTITY,
    id,
    amt: newQuantity
  }
}

export const updateMultiple = (objWithNewQuants) => {
  return {
    type: UPDATE_MULTIPLE,
    changes: objWithNewQuants
  }
}

export const trashBeer = (id) => {
  return {
    type: DELETE_BEER,
    id
  }
}
