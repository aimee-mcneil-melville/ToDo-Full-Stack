import {
  AUTH_REQUEST,
  AUTH_FAILURE,
  LOGIN,
  LOGOUT,
  Action,
} from '../actions/auth'

import { JwtResponse } from 'authenticare/client'

const initialState: State = {
  user: undefined,
  isFetching: false,
  isAuthenticated: false,
  errorMessage: '',
}

interface State {
  user?: JwtResponse
  isFetching: boolean
  isAuthenticated: boolean
  errorMessage?: string
}

export default function auth(state = initialState, action: Action): State {
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
