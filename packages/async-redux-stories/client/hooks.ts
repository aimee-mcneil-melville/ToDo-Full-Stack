import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { ThunkDispatch } from 'redux-thunk'
import type { AnyAction } from 'redux'

import type { RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => ThunkDispatch<RootState, void, AnyAction> =
  useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
