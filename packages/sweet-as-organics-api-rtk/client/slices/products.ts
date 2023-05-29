import type { Product } from '../../models/Product'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getProducts } from '../api/products'

const initialState = [] as Product[]

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = (await getProducts()) as Product[]
    return products
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchProducts.fulfilled,
      (_, action: PayloadAction<Product[]>) => {
        return action.payload
      }
    )
  },
})

export default productsSlice.reducer
