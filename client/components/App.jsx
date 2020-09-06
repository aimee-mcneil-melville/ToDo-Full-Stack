import React from 'react'
import { connect } from 'react-redux'

import Cart from './Cart'
import Header from './Header'
import ProductList from './ProductList'
import ErrorMessage from './ErrorMessage'

const App = (props) => {
  return (
    <div className='app'>
      <Header />
      <ErrorMessage />
      {props.currentPage === 'listing' ? <ProductList /> : <Cart />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps)(App)
