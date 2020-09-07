import React from 'react'
import { connect } from 'react-redux'

import { addToCart } from '../actions/cart'

import ProductListItem from './ProductListItem'
import WaitIndicator from './WaitIndicator'

class ProductList extends React.Component {
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
