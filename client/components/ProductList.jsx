import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { addToCart } from '../actions/cart'
import { fetchProducts } from '../actions/products'

import ProductListItem from './ProductListItem'

function ProductList (props) {
  useEffect(() => {
    props.dispatch(fetchProducts())
  }, [])

  function addProductToCart (product) {
    const { id, name } = product
    const newCartItem = { id, name }
    props.dispatch(addToCart(newCartItem))
    props.history.push('/cart')
  }

  return (
    <div className='productlist'>
      <div className='welcome'>
        <p>
          Welcome! Please choose from our delicious selection and don&apos;t
          hesitate to let us know if we can answer any of your questions.
        </p>
      </div>
      {props.children} {/* This holds the WaitIndicator (from App) */}
      {props.products.map(product => {
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

function mapStateToProps (state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(ProductList)
