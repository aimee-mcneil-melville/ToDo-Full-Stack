import React from 'react'

const Tile = props => {
  return (
    <div className='tile' onClick={props.handleClick}>
      {props.isVisible && props.value}
    </div>
  )
}

export default Tile
