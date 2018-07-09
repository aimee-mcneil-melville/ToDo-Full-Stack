import React from 'react'

const Tile = props => {
  // convert the unicode hexadecimal value of the emoji into a string
  const tileValue = String.fromCodePoint(parseInt(props.value, 16))
  return (
    <div className='tile' onClick={props.handleClick}>
      {props.isVisible &&
        <span title={props.info}>
          {tileValue}
        </span>
      }
    </div>
  )
}

export default Tile
