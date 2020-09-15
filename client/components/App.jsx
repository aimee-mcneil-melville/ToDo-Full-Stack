import React from 'react'
import { Route } from 'react-router-dom'

import Header from './Header'
import ErrorMessage from './ErrorMessage'
import Cart from './Cart'
import ProductList from './ProductList'
import OrderList from './OrderList'
import WaitIndicator from './WaitIndicator'

const App = () => {
  return (
    <div className='app'>
      <Route path='/' component={Header} />
      <Route path='/' component={ErrorMessage} />
      <Route exact path='/' render={({ history }) => {
        return <ProductList history={history}>
          <WaitIndicator />
        </ProductList>
      }} />
      <Route path='/cart' render={({ history }) => {
        return <Cart history={history}>
          <WaitIndicator />
        </Cart>
      }} />
      <Route path='/orders' render={() => {
        return <OrderList>
          <WaitIndicator />
        </OrderList>
      }} />
    </div>
  )
}

export default App
