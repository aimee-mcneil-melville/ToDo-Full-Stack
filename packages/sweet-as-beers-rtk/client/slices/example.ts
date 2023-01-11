// WARNING: this file is only a guide! not to be used as part of the challenge!
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: string[] = []

// where our business logic goes
export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    exampleAddToArray: (state, action) => {
      return [...state, action.payload.example]
    },
  },
})

// a selector to be used as: const example = useSelector(exampleSelector)
export const exampleSelector = (state: RootState) => state.example

// actions to be dispatched using dispatch(exampleAddToArray({ example: 'hi' }))
export const { exampleAddToArray } = exampleSlice.actions

// the reducer to be used in store.js
export default exampleSlice.reducer
