import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'

// import { getGardens } from '../apiClient'

function App () {
  // const [gardens, setGardens] = useState([])

  // useEffect(() => {
  //   getGardens().then(setGardens)
  // }, [])

  return (
    <div className='app'>
      <h1>Gardenz</h1>
      {/* route for home page */}
      <Route exact path='/' component={ Home } />
      {/* route for garden page */}
      {/* <Route path='/garden' component={ Garden } /> */}
      {/* <ul>
        {gardens.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul> */}
    </div>
  )
}

export default App
