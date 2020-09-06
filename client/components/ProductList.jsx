import React from 'react'
import { connect } from 'react-redux'

import { getProducts } from '../api/products'

import { addToCart } from '../actions/cart'
import { navigate } from '../actions/navigate'
import { showError } from '../actions/error'
import { requestProducts, receiveProducts } from '../actions/products'

import ProductListItem from './ProductListItem'
import WaitIndicator from './WaitIndicator'

class ProductList extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(requestProducts())
    getProducts()
      .then(products => {
        dispatch(receiveProducts(products))
      })
      .catch(err => {
        dispatch(showError(err.message))
      })
  }
  render () {
    const { products, dispatch } = this.props
    return (
      <div className='productlist'>
        <p className='welcome'>
          Welcome! Please choose from our delicious selection and don&apos;t
          hesitate to let us know if we can answer any of your questions.
        </p>
        <WaitIndicator />
        {products.map(product => {
          return (
            <ProductListItem
              key={product.id}
              product={product}
              addToCart={item => {
                dispatch(addToCart(item))
                dispatch(navigate('cart'))
              }}
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

export default connect(
  mapStateToProps
)(ProductList)
