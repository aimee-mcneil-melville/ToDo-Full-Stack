import React from 'react'
import { Route } from 'react-router-dom'

import Header from './Header'
import ErrorMessage from './ErrorMessage'
import Cart from './Cart'
import ProductList from './ProductList'
import OrderList from './OrderList'

const App = () => {
  return (
    <div className='app'>
      <Route path='/' component={Header} />
      <Route path='/' component={ErrorMessage} />
      <Route exact path='/' component={ProductList} />
      <Route path='/cart' component={Cart} />
      <Route path='/orders' component={OrderList} />
    </div>
  )
}

export default App
