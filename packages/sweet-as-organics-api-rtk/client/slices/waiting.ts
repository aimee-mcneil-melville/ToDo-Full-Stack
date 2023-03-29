import { createSlice } from '@reduxjs/toolkit'
import type { AnyAction } from '@reduxjs/toolkit'

// this slice is used to track/listen whether any async actions are pending or not
const waitingSlice = createSlice({
  name: 'waiting',
  initialState: false,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      // if any async action ends with /pending, set waiting to true
      (action: AnyAction) => action.type.endsWith('/pending'),
      () => true
    )
    builder.addMatcher(
      // if any async action ends with /fulfilled or rejected, set waiting to false
      (action: AnyAction) =>
        action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
      () => false
    )
  },
})

export default waitingSlice.reducer
