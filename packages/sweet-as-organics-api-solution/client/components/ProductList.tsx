import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { Product } from '../../models/product'
import { addToCart } from '../actions/cart'
import { fetchProducts } from '../actions/products'
import { useAppDispatch, useAppSelector } from '../hooks'

import ProductListItem from './ProductListItem'
interface Props {
  children: ReactNode
}

function ProductList({ children }: Props) {
  const products = useAppSelector((state) => state.products)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  function addProductToCart(product: Product) {
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
