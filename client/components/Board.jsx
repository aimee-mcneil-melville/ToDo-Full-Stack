import React, { useState } from 'react'

import Tile from './Tile'

function Board (props) {
  const [tile1, setTile1] = useState(null)
  const [tile2, setTile2] = useState(null)

  const handleClick = (id) => {
    if (tile1 && tile2) return

    const tile = props.tiles.find((tile) => {
      return tile.id === id
    })
    tile.isVisible = true

    // if the first tile is being flipped
    if (tile1 === null) {
      setTile1(tile)
      return
    }
    // if the second tile is being flipped
    setTile2(tile)
    processPair(tile)
  }

  const processPair = (tile2) => {
    if (tile1) {
      const isMatch = tile1.value === tile2.value

      const processSelectedTiles = () => {
        setTile1(null)
        setTile2(null)
        props.evalMatch(tile1, tile2)
      }

      if (isMatch) {
        processSelectedTiles()
      } else {
        setTimeout(processSelectedTiles, 1000)
      }
    }
  }

  return (
    <div className="tiles">
      {props.tiles.map((tile) => {
        return (
          <Tile
            key={tile.id}
            info={tile.info}
            value={tile.value}
            isVisible={tile.isVisible}
            handleClick={() => handleClick(tile.id)}
          />
        )
      })}
    </div>
  )
}

export default Board
