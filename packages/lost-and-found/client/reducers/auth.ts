import {
  AUTH_REQUEST,
  AUTH_FAILURE,
  LOGIN,
  LOGOUT,
} from '../actions/auth'

import { User } from '../../common/User'

const initialState = {
  user: null,
  isFetching: false,
  isAuthenticated: false,
  errorMessage: '',
}

type Action =
  | { type: 'AUTH_REQUEST'; payload: null}
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT'; payload: null}

export default function auth(state = initialState, action: Action) {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: '',
      }
    case LOGIN:
      return {
        user: action.payload,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
      }
    case LOGOUT:
      return {
        user: null,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: '',
      }
    case AUTH_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}
