import React from 'react'

import Header from './Header'
import BeerList from './BeerList'

import beerData from '../../data/beers'

function App () {
  return (
    <div className='app'>
      <Header />
      <BeerList beers={beerData.beers} />
    </div>
  )
}

export default App
