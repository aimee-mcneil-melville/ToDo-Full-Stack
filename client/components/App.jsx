import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import Header from './Header'
import ErrorMessage from './ErrorMessage'
import Cart from './Cart'
import ProductList from './ProductList'
import Orders from './Orders'

import { getProducts } from '../coordinators'

class App extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    getProducts(dispatch)
  }
  render () {
    return (
      <div className='app'>
        <Route path='/' component={Header} />
        <Route path='/' component={ErrorMessage} />
        <Route exact path='/' component={ProductList} />
        <Route path='/cart' component={Cart} />
        <Route path='/orders' component={Orders} />
      </div>
    )
  }
}

export default connect()(App)
