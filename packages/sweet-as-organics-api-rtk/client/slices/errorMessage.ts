import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type ShowErrorPayload = {
  message: string
}

const errorMessageSlice = createSlice({
  name: 'errorMessage',
  initialState: '',
  reducers: {
    showError: (_, action: PayloadAction<ShowErrorPayload>) =>
      action.payload.message,
    hideError: () => '',
  },
})

export const { showError, hideError } = errorMessageSlice.actions
export default errorMessageSlice.reducer
