import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './Header'
import ErrorMessage from './ErrorMessage'
import Cart from './Cart'
import ProductList from './ProductList'
import OrderList from './OrderList'
import WaitIndicator from './WaitIndicator'

function App() {
  return (
    <div className="app">
      <Header />
      <ErrorMessage />
      <Routes>
        <Route
          path="/"
          element={
            <ProductList>
              <WaitIndicator />
            </ProductList>
          }
        />
        <Route
          path="/cart"
          element={
            <Cart history={history}>
              <WaitIndicator />
            </Cart>
          }
        />
        <Route
          path="/orders"
          element={
            <OrderList>
              <WaitIndicator />
            </OrderList>
          }
        />
      </Routes>
    </div>
  )
}

export default App
