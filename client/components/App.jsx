import React from 'react'

import Cart from './Cart'
import Header from './Header'
import BeerList from './BeerList'

import beerData from '../../data/beers'

class App extends React.Component {
  state = {
    activePage: 'listing'
  }

  handleKeepShopping = () => {
    // TODO: implement
  }

  handleAddToCart = () => {
    // TODO: implement
  }

  render () {
    const cart = <Cart cart={[]} keepShopping={this.handleKeepShopping} />
    const beerList = <BeerList beers={beerData.beers} addToCart={this.handleAddToCart} />

    return (
      <div className='app'>
        <Header />
        {this.state.activePage === 'listing' ? beerList : cart}
      </div>
    )
  }
}

export default App
