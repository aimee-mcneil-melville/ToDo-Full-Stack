/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import type { ThunkDispatch, ThunkAction } from 'redux-thunk'
import reducers from './reducers'
import type { AppAction } from './actions/index'
import { composeWithDevTools } from '@redux-devtools/extension'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, never, AppAction>
export type AppThunkAction<T = unknown> = ThunkAction<
  Promise<T>,
  RootState,
  never,
  AppAction
>

export default store
