import { UserData } from '../../models/user.ts'
import { UserAction, SET_USER, CLEAR_USER } from '../actions/user.ts'

const emptyUser = {
  auth0Id: '',
  name: '',
  email: '',
  token: '',
}

export default function (
  state: UserData | undefined = emptyUser,
  action: UserAction
): UserData {
  switch (action.type) {
    case SET_USER:
      return action.payload

    case CLEAR_USER:
      return emptyUser

    default:
      return state
  }
}
