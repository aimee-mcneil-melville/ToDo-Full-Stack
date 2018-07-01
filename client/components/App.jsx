import React from 'react'

import Wombats from './Wombats'

function App (props) {
  const wombats = props.wombats
  return (
    <div>
      <Wombats wombats={wombats} />
    </div>
  )
}

export default App
