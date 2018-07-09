import React from 'react'

const Tile = props => {
  // convert the unicode hexadecimal value of the emoji into a string
  const tileValue = String.fromCodePoint(parseInt(props.value, 16))
  return (
    <div className='tile'>
      {tileValue}
    </div>
  )
}

export default Tile
