import { legacy_createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import type { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

import reducer from './reducers'
import type { AppAction } from './actions/'

const store = legacy_createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, never, AppAction>
export type AppThunkAction<T = unknown> = ThunkAction<
  Promise<T>,
  RootState,
  never,
  AppAction
>

export default store
