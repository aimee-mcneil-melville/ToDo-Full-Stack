/* eslint-disable no-unused-vars */

import { TileData } from '../startingTiles'

type Props = {
  onClick: (tile: TileData) => void
  tile: TileData
}

function Tile(props: Props) {
  return (
    <button className="tile" onClick={() => props.onClick(props.tile)}>
      {props.tile.isVisible && props.tile.value}
    </button>
  )
}

export default Tile
