import React from 'react'

function Wombats (props) {
  const wombats = props.wombats
  return (
    <div>
      <h1>Wombats</h1>
      <ul>
        {wombats.map((wombat, i) => <li key={i}>{wombat}</li>)}
      </ul>
    </div>
  )
}

export default Wombats
