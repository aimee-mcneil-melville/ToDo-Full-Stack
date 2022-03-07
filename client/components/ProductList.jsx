import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { addToCart } from '../actions/cart'
import { fetchProducts } from '../actions/products'

import ProductListItem from './ProductListItem'

function ProductList({ children }) {
  const products = useSelector((state) => state.products)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  function addProductToCart(product) {
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
