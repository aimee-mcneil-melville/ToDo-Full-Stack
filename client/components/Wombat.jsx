import React from 'react'
import store from '../store'

function Wombat (props) {
  const wombat = props.name

  return (
    <div>{wombat}</div>
  )
}

export default Wombat
