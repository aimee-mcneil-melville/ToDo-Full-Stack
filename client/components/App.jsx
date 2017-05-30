import React from 'react'

import Cart from './Cart'
import Header from './Header'
import BeerList from './BeerList'

import beerData from '../../data/beers'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      activePage: "listing",
      cart: []
    }
    this.addToCart = this.addToCart.bind(this)
    this.keepShopping = this.keepShopping.bind(this)
  }

  addToCart (id) {
    this.setState({
      cart: [
        ...this.state.cart,
        {id, quantity: 1} // TODO: increment if already added
      ],
      activePage: "cart"
    })
  }

  keepShopping () {
    this.setState({
      activePage: "listing"
    })
  }

  render () {
    const cart = <Cart cart={this.state.cart} keepShopping={this.keepShopping} />
    const beerList = <BeerList beers={beerData.beers} addToCart={this.addToCart} />
    return (
      <div className='app'>
        <Header />
        {this.state.activePage === "listing" ? beerList : cart}
      </div>
    )
  }
}

export default App
