import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store.ts'

type Payload = {
  page: string
}

export const activePageSlice = createSlice({
  name: 'activePage',
  initialState: 'home',
  reducers: {
    navigate: (_, action: PayloadAction<Payload>) => {
      return action.payload.page
    },
  },
})

export const { navigate } = activePageSlice.actions
export const selectActivePage = (state: RootState) => state.activePage
export default activePageSlice.reducer
