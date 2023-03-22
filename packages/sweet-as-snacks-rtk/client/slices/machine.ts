import { createSlice } from '@reduxjs/toolkit'
import products from '../products'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { formatMoney } from '../utils'

export type Product = typeof products[0]

type State = {
  revenue: number
  deposit: number
  products: Product[]
  dispenser: string | null
  change: number
  message: string
}

const initialState: State = {
  revenue: 0,
  deposit: 0,
  products,
  dispenser: null,
  change: 0,
  message: 'Deposit funds',
}

const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    deposit: () => {},
    select: () => {},
    openDispenser: () => {},
  },
})

export const { deposit, select, openDispenser } = machineSlice.actions
export default machineSlice.reducer
