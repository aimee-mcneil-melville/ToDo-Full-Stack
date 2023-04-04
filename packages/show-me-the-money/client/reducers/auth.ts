
import { JwtResponse } from 'authenticare/client'
import { AUTH_REQUEST, AUTH_FAILURE, LOGIN, LOGOUT, Action } from '../actions/auth'

interface AuthState {
  user?: JwtResponse
  isFetching: boolean
  isAuthenticated: boolean,
  errorMessage?: string
}

const initialState = {
  user: undefined,
  isFetching: false,
  isAuthenticated: false,
  errorMessage: '',
}

export default function auth(state = initialState, action: Action): AuthState {
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
        user: undefined,
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
