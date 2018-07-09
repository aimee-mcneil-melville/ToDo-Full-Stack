import React from 'react'

import Tile from './Tile'

class Board extends React.Component {
  render () {
    return <div className='tiles'>
      {this.props.tiles.map(tile => {
        return <Tile
          key={tile.id}
          info={tile.info}
          value={tile.value}
          isVisible={tile.isVisible} />
      })}
    </div>
  }
}

export default Board
