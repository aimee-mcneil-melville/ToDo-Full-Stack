<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/components/ProductList.tsx
import type * as React from 'react'
import { useEffect } from 'react'
=======
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
>>>>>>> main:packages/sweet-as-organics-api/client/components/ProductList.tsx
import { useNavigate } from 'react-router-dom'
import { Product } from '../../common/interfaces'

import { addToCart } from '../actions/cart'
import { fetchProducts } from '../actions/products'
import { useAppDispatch, useAppSelector } from '../hooks'

import ProductListItem from './ProductListItem'

<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/components/ProductList.tsx
function ProductList({ children }: { children: React.ReactNode }) {
=======
interface Props {
  children: ReactNode
}

function ProductList({ children }: Props) {
>>>>>>> main:packages/sweet-as-organics-api/client/components/ProductList.tsx
  const products = useAppSelector((state) => state.products)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/components/ProductList.tsx
  function addProductToCart(product: Product) {
=======
  function addProductToCart(product: { id: number; name: string }) {
>>>>>>> main:packages/sweet-as-organics-api/client/components/ProductList.tsx
    const { id, name } = product
    const newCartItem = { id, name }
    dispatch(addToCart(newCartItem))
    navigate('/cart')
  }

  return (
    <div className="productlist">
      <div className="welcome">
        <p>
          Welcome! Please choose from our delicious selection and don&apos;t
          hesitate to let us know if we can answer any of your questions.
        </p>
      </div>
      {children} {/* This holds the WaitIndicator (from App) */}
      {products.map((product) => {
        return (
          <ProductListItem
            key={product.id}
            product={product}
            addToCart={addProductToCart}
          />
        )
      })}
    </div>
  )
}

export default ProductList
