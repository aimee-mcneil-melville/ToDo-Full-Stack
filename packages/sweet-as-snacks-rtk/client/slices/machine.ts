import { createSlice } from '@reduxjs/toolkit'
import products from '../products'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { formatMoney } from '../utils'

export type Product = typeof products[0]

type State = {
  revenue: number
  deposit: number
  products: Product[]
  door: string | null
  change: number
  message: string
}

const initialState: State = {
  revenue: 0,
  deposit: 0,
  products,
  door: null,
  change: 0,
  message: 'Deposit funds',
}

const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    deposit: () => {},
    select: () => {},
    openDoor: () => {},
  },
})

export const { deposit, select, openDoor } = machineSlice.actions
export default machineSlice.reducer
