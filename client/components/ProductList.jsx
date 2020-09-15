import React from 'react'
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

class ProductList extends React.Component {
  componentDidMount () {
    const { fetchProductsPending, fetchProductsSuccess, showError } = this.props
    const dispatchers = { fetchProductsPending, fetchProductsSuccess, showError }
    getProducts(dispatchers)
  }

  render () {
    const { children, products, history, addToCart } = this.props
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
              addToCart={item => addCartItem(item, history, addToCart)}
            />
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
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
