import React from 'react'

import Tile from './Tile'

function Board(props) {
  return (
    <div className="tiles" data-testid="Board">
      {props.tiles.map((tile) => {
        return (
          <Tile
            key={tile.id}
            info={tile.info}
            value={tile.value}
            isVisible={tile.isVisible}
          />
        )
      })}
    </div>
  )
}

export default Board
