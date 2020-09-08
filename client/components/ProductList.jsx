import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToCart } from '../actions/cart'

import ProductListItem from './ProductListItem'
import WaitIndicator from './WaitIndicator'

import { getProducts } from '../api-helpers'

class ProductList extends React.Component {
  componentDidMount () {
    getProducts(this.props.dispatch)
  }

  render () {
    const { products, dispatch } = this.props
    return (
      <div className='productlist'>
        <div className='welcome'>
          <p>
            Welcome! Please choose from our delicious selection and don&apos;t
            hesitate to let us know if we can answer any of your questions.
          </p>
          <button>
            <Link to='/orders'>My Orders</Link>
          </button>
        </div>
        <WaitIndicator />
        {products.map(product => {
          return (
            <ProductListItem
              key={product.id}
              product={product}
              addToCart={item => {
                dispatch(addToCart(item))
                this.props.history.push('/cart')
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
