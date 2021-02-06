import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { addToCart } from '../actions/cart'
import { showError } from '../actions/error'
import {
  fetchProductsPending,
  fetchProductsSuccess
} from '../actions/products'

import ProductListItem from './ProductListItem'

import { getProducts } from '../coordinators/products'
import { addCartItem } from '../coordinators/cart'

function ProductList (props) {
  useEffect(() => {
    const { fetchProductsPending, fetchProductsSuccess, showError } = props
    const dispatchers = { fetchProductsPending, fetchProductsSuccess, showError }
    getProducts(dispatchers)
  }, [])

  function addProductToCart (item) {
    const { history, addToCart } = props
    addCartItem(item, history, addToCart)
  }

  const { children, products } = props
  return (
    <div className='productlist'>
      <div className='welcome'>
        <p>
          Welcome! Please choose from our delicious selection and don&apos;t
          hesitate to let us know if we can answer any of your questions.
        </p>
      </div>
      {children}
      {products.map(product => {
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

const mapDispatchToProps = {
  addToCart,
  fetchProductsPending,
  fetchProductsSuccess,
  showError
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
