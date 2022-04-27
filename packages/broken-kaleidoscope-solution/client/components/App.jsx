import React from 'react'

import Pixel from './Pixel'

function App () {
  return Array.from({ length: 1000 }, (item, i) => <Pixel key={i} />)
}

export default App
