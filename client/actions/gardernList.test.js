import { GET_GARDEN_LIST } from '../actions/gardernList'

export default function allGardenList (state = [], action) {
  switch (action.type) {
    case GET_GARDEN_LIST:
      return action.gardernList
  }
}
