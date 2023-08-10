import { createStore, applyMiddleware } from 'redux'
import type { ThunkDispatch, ThunkAction as BaseThunkAction } from 'redux-thunk'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import reducers from './reducers/index.ts'
import type { Action } from './actions/index.ts'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk as any)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, never, Action>
export type ThunkAction = BaseThunkAction<
  Promise<unknown>,
  RootState,
  never,
  Action
>
export default store
