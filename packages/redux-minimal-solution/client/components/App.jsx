import React from 'react'

import Wombats from './Wombats'

function App (props) {
  return (
    <div>
      <Wombats store={props.store} />
    </div>
  )
}

export default App
